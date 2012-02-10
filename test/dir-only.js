var dive = require("../");

dive(process.cwd(), { directories: true, files: false },
    function(err, file) {
  if (err) throw err;
  console.log(file);
});
