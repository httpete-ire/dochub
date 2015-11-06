// load config
require('dotenv').load();
const async = require('async');
const chalk = require('chalk');

console.log(chalk.blue('[APP] initializing application...'));

const startScripts = [function initDb(cb) {
  require('./config/initializers/database')(cb);
},
function initServer(cb) {
  require('./config/initializers/server')(cb);
}];

async.series(startScripts, function(err) {
  if (err) {
    console.log(chalk.red('[APP] error initializing application'));
  } else {
    console.log(chalk.blue('[APP] application initializied'));
  }
});
