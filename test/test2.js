var dive = require("../");

var res = [];

dive(process.cwd(), function(err, file) {
  if (err)
    throw err;
  res.push(file);
});

setTimeout(function() {
  console.log(res);
  console.log();
  console.log(res.sort());
}, 500);
