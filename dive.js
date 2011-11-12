var fs = require('fs'),
    append = require('append');

// default options
var defaultOpt = {
  all: false,
  recursive: true,
  directories: false
};

// general function
module.exports = function(dir, opt, action, complete) {

  // check args
  if (typeof opt == 'function') {
    if (typeof action == 'undefined')
      complete = function () {};
    else
      complete = action;

    action = opt;
    opt = { };
  } else if (typeof complete == 'undefined')
    complete = function () {};

  // Assert that dir is a string
  if (typeof dir != 'string')
    dir = process.cwd();

  opt = append(defaultOpt, opt);

  function dive(dir) {
    // Read the directory
    fs.readdir(dir, function(err, list) {
      todo--;
      // Return the error if something went wrong
      if (err) return action(err);

      // For every file in the list
      list.forEach(function(file) {

        if (opt.all || file[0] != '.') {
          todo++;

          // Full path of that file
          var path = dir + '/' + file;
          // Get the file's stats
          fs.stat(path, function(err, stat) {
            if (err) return action(err);

            // If the file is a directory
            if (stat) {
              if (stat.isDirectory()) {
                // Call action if enabled for directories
                if (opt.directories)
                  action(null, path);

                // Dive into the directory
                if (opt.recursive)
                  dive(path);
              } else {
                // Call the action
                action(null, path);

                if (!--todo)
                  complete();
              }
            }
          });
        }
      });
      //empty directories
      if(!list.length && !todo){
        complete();
      }
    });
  };

  var todo = 1;
  dive(dir);
};
