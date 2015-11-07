'use strict';

const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const path = require('path');
const bodyParser = require('body-parser');
const apiRouteLoader = require('./../../../routes/api');
const pageRouteLoader = require('./../../../routes/page');
const hbs = require('hbs');

let app = null;
let logger = null;

module.exports =  function(cb) {

  console.log(chalk.blue('[SERVER] server initializing...'));

  app = express();

  app.set('view engine', 'hbs');
  app.set('views', path.resolve(__dirname, './../../../views'));

  app.use(express.static(path.resolve(__dirname, './../../../../public')));

  if (process.env.NODE_ENV === 'dev') {
    logger = morgan('dev');
  } else {
    logger = morgan('common');
  }

  app.use(logger);

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json({type: '*/*'}));

  // load API routes
  apiRouteLoader(app);

  // load page routes
  pageRouteLoader(app);

  app.listen(process.env.PORT || 4000);

  console.log(chalk.blue('[SERVER] server initializied'));
  cb();
};
