var dive = require('../');

dive(process.cwd, {
  filter: function filter(path, dir) {
    return dir || /\.js$/i.test(path);
  }
}, function (err, file) {
  if (err) throw err;
  console.log(file);
}, function () {
  console.log('complete');
});
