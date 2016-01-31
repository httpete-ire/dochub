'use strict';

const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const expressValidator = require('express-validator');
const cors = require('cors');

// loader functions
const authRouteLoader = require(__base + 'routes/auth');
const apiRouteLoader = require(__base + 'routes/api');
const pageRouteLoader = require(__base + 'routes/page');

// load emails
const loadEmailTemplates = require(__base + 'mailer/templates').loadTemplates;

// error handling
const errorMiddleware = require(__base + 'helpers/middleware/error');

let app = null;
let logger = null;

module.exports =  function(cb) {

  console.log(chalk.blue('[SERVER] server initializing...'));

  app = express();

  app.set('view engine', 'hbs');
  app.set('views', path.resolve(__dirname, __base + 'views'));

  loadEmailTemplates();

  app.use(express.static(path.resolve(__dirname, __base + './../public')));

  if (process.env.NODE_ENV === 'dev') {
    logger = morgan('dev');
  } else {
    logger = morgan('common');
  }

  app.use(logger);
  app.use(cors());

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(expressValidator());

  // load API routes
  apiRouteLoader(app);

  // // load auth routes
  authRouteLoader(app);

  // // load page routes
  pageRouteLoader(app);

  app.use(errorMiddleware);

  console.log(chalk.blue('[SERVER] routes established'));

  app.listen(process.env.NODE_PORT || 4000);

  console.log(chalk.blue('[SERVER] server initializied'));
  cb();
};
