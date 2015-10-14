var fs = require('fs');
var path = require('path');

// default options
var defaultOpt = {
  all: false,
  recursive: true,
  files: true,
  directories: false
};

function defaults(defaults, obj) {
  for (var prop in defaults)
    if (defaults.hasOwnProperty(prop))
      if (!obj.hasOwnProperty(prop))
        obj[prop] = defaults[prop];
  return obj;
}

// general function
module.exports = function(dir, opt, action, complete) {

  // check args
  if (typeof opt === 'function') {
    if (typeof action === 'undefined')
      complete = function () {};
    else
      complete = action;

    action = opt;
    opt = { };
  } else if (typeof complete === 'undefined')
    complete = function () {};

  // Assert that dir is a string
  if (typeof dir !== 'string')
    dir = process.cwd();

  opt = defaults(defaultOpt, opt);

  function dive(dir) {
    // Read the directory
    todo++;
    fs.readdir(dir, function(err, list) {
      todo--;
      // Return the error if something went wrong
      if (err) {
        action(err, dir);
      } else {
        // For every file in the list
        list.forEach(function(file) {

          if (opt.all || file[0] !== '.') {

            // Full path of that file
            var fullPath = path.resolve(dir, file);
            // Get the file's stats
            todo++;
            fs.lstat(fullPath, function(err, stat) {
              todo--;
              if (err) {
                action(err, fullPath);
              } else {
                if (stat) {
                  // If the file is a directory
                  if (stat.isDirectory()) {
                    // Call action if enabled for directories
                    if (opt.directories)
                      action(null, fullPath, stat);

                    // Dive into the directory
                    if (opt.recursive)
                      dive(fullPath);

                  } else {
                    // Call action if enabled for files
                    if (opt.files)
                      action(null, fullPath, stat);
                  }
                }
              }
              if (!todo)
                complete();
            });
          }

        });

      }
      //empty directories, or with just hidden files
      if (!todo)
        complete();
    });
  }

  var todo = 0;
  dive(path.resolve(dir));
};
