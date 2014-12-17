var dive = require("../");

// Using RegExp on file
dive(process.cwd(), { ignore: /ignore\.js/ },
    function(err, file) {
  if (err) throw err;

  if (file.match(/ignore\.js/)) throw new Error('ignore.js was not ignored')
}, function() {
	console.log('Ignored "ignore.js" using RegExp without throwing');
});

// Using string on file
dive(process.cwd(), { ignore: 'ignore.js' },
    function(err, file) {
  if (err) throw err;

  if (file.match(/ignore\.js/)) throw new Error('ignore.js was not ignored')
}, function() {
	console.log('Ignored "ignore.js" using string without throwing');
});

// Using RegExp on directory
dive(process.cwd(), { ignore: /node_modules/ },
    function(err, file) {
  if (err) throw err;

  if (file.match(/node_modules/)) throw new Error('node_module files were not ignored')
}, function() {
	console.log('Ignored "node_modules" using RegExp without throwing');
});

// Using string on directory
dive(process.cwd(), { ignore: 'node_modules' },
    function(err, file) {
  if (err) throw err;

  if (file.match(/node_modules/)) throw new Error('node_module files were not ignored')
}, function() {
	console.log('Ignored "node_modules" using string without throwing');
});