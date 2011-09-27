var dive = require("../");

dive(process.cwd(), { directories: true },
    function(err, file) {
  if (err) throw err;
  console.log(file);
});
