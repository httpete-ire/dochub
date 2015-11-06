// morgan logger
// body parser
// public directory
// express
// routes
const express = require('express');
const morgan = require('morgan');

module.exports =  function(cb) {
	'use strict';




  console.log(chalk.blue('[SERVER]'));
  cb();
};
