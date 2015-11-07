// load config
require('dotenv').load();
const async = require('async');
const chalk = require('chalk');

console.log(chalk.blue('[APP] initializing application...'));

const startScripts = [function initDb(cb) {
  require('./helpers/initializers/database')(cb);
},
function initServer(cb) {
  require('./helpers/initializers/server')(cb);
}];

async.series(startScripts, function(err) {
  if (err) {
    console.log(chalk.red('[APP] error initializing application'));
  } else {
    console.log(chalk.blue('[APP] application initializied and listening on port' + process.env.NODE_PORT));
  }
});
