var dive = require('../');

dive(process.cwd(), function(err, file) {
  if (err) throw err;
  console.log(file);
}, function() { console.log('complete'); });
