const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports =  function(cb) {
  mongoose.connect(process.env.DB);
  mongoose.Promise = require('q').Promise;
  console.log(chalk.blue('[DATABASE] connection to database established'));
  cb();
};
