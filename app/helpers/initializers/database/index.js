const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports =  function(cb) {
  mongoose.connect(process.env.DB);
  console.log(chalk.blue('[DATABASE] connection to database established'));
  cb();
};
