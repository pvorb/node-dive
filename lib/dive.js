var fs = require("fs");

// General function
var dive = function(dir, opt, action) {

	// action is the last argument
	action = arguments[arguments.length - 1];

	// Assert that dir is a string
	if (typeof dir !== "string")
		dir = process.cwd();

	// Assert that opt is an object
	if (opt == undefined || typeof opt !== "object")
		opt = { };

	// Default settings
	if (opt.recursive == undefined)
		opt.recursive = true;
	if (opt.all == undefined)
		opt.all = false;

	// Assert that it's a function
	if (typeof action !== "function")
		action = function(error, file) { };

	// Read the directory
	fs.readdir(dir, function(err, list) {
		// Return the error if something went wrong
		if (err)
			return action(err);

		// For every file in the list
		list.forEach(function(file) {
			if (opt.all || file[0] != ".") {
				// Full path of that file
				var path = dir + "/" + file;
				// Get the file's stats
				fs.stat(path, function(err, stat) {
					// If the file is a directory
					if (stat && stat.isDirectory()) {
						// Dive into the directory
						if (opt.recursive)
							dive(path, opt, action);
					} else {
						// Call the action
						action(null, path);
					}
				});
			}
		});
	});
};

module.exports = dive;
