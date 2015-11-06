'use strict';

const fs = require('fs');
const express = require('express');

const currentFile = __dirname + '/index.js';
let router = express.Router();

module.exports =  function routes(app) {

  // load read every file in the current directory
  //
  loadRoutes(__dirname, app);
};

function loadRoutes(directory, app) {

  // we can use a synchronous here becasue we are
  // bootstrapping the application
  const files = fs.readdirSync(directory);
  let fileStats;
  let fileName;

  files.forEach(function(file) {

    fileName = directory + '/' + file;

    // ensure it doesnt try laod current file
    if (fileName !== currentFile) {

      fileStats = fs.statSync(fileName);

      // if file is a directory call the function
      // recursively to load the files within
      if (fileStats.isDirectory()) {
        loadRoutes(fileName, app);
      } else {
        require(fileName)(router);
      }

    }

  });

  app.use('/api', router);

}
