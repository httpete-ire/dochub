'use strict';

const routeLoader = require('./../../lib/route-loader.js');
const API_VERSION = ['v1'];

module.exports =  function loadAPI(app) {

  API_VERSION.forEach(function(version) {

    routeLoader(__dirname + '/' + version, app, function(router) {
      app.use('/api/' + version, router);
    });

  });

};
