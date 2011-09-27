var dive = require("../");

dive(process.cwd(), { all: true, recursive: false }, function(err, file) {
  if (err) throw err;
  console.log(file);
});
