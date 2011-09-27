var dive = require('../');

dive(process.cwd(), function(err, file) {
  if (err) throw err;
  console.log('1 '+file);
}, function() { console.log('first complete'); });

dive(process.cwd(), function(err, file) {
  if (err) throw err;
  console.log('2 '+file);
}, function() { console.log('second complete'); });
