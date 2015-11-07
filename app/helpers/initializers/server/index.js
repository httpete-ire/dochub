'use strict';

const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const expressValidator = require('express-validator');

// loader functions
const authRouteLoader = require('./../../../routes/auth');
const apiRouteLoader = require('./../../../routes/api');
const pageRouteLoader = require('./../../../routes/page');

// error handling
const errorMiddleware = require('./../../middleware/error');

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
  app.use(bodyParser.json());
  app.use(expressValidator());

  // load API routes
  apiRouteLoader(app);

  // load page routes
  pageRouteLoader(app);

  // load auth routes
  authRouteLoader(app);

  express.Router().use(errorMiddleware);

  console.log(chalk.blue('[SERVER] routes established'));

  app.listen(process.env.NODE_PORT || 4000);

  console.log(chalk.blue('[SERVER] server initializied'));
  cb();
};
