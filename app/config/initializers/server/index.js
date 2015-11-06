'use strict';

const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const path = require('path');
const bodyParser = require('body-parser');
const apiLoader = require('./../../../routes');

let app = null;
let logger = null;

module.exports =  function(cb) {

  console.log(chalk.blue('[SERVER] server initializing...'));

  app = express();

  app.use(express.static(path.resolve(__dirname, './../../../../public')));

  if (process.env.NODE_ENV === 'dev') {
    logger = morgan('dev');
  } else {
    logger = morgan('common');
  }

  app.use(logger);

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json({type: '*/*'}));

  apiLoader(app);

  console.log(chalk.blue('[SERVER] server initializied'));
  cb();
};
