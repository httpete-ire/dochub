'use strict';

const fs = require('fs');
const express = require('express');

let currentFile;
let router = express.Router();

module.exports =  function loadRoutes(dir, app, cb) {

  currentFile = dir + '/index.js';

  scanRoutes(dir);

  if (cb) {
    cb(router);
  }

  function scanRoutes(dir) {
    const files = fs.readdirSync(dir);

    let fileStats;
    let fileName;

    files.forEach(function(file) {

      fileName = dir + '/' + file;

      // ensure it doesnt try laod current file
      if (fileName !== currentFile) {

        fileStats = fs.statSync(fileName);

        // if file is a directory call the function
        // recursively to load the files within
        if (fileStats.isDirectory()) {
          scanRoutes(fileName);
        } else {
          require(fileName)(router);
        }

      }

    });

  }

};
