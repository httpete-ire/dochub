// morgan logger
// body parser
// public directory
// express
// routes

'use strict';

const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const path = require('path');
const bodyParser = require('body-parser');

let app = null;
let logger = null;

module.exports =  function(cb) {

  app = express();

  app.use(express.static(path.resolve(__dirname,'./../../../../public')));

  if (process.env.NODE_ENV === 'dev') {
    logger = morgan('dev');
  } else {
    logger = morgan('common');
  }

  app.use(logger);

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json({type: '*/*'}));

  console.log(chalk.blue('[SERVER]'));
  cb();
};
