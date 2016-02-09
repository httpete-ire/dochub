'use strict';

const routeLoader = require(__base + 'helpers/route-loader.js');
const API_VERSION = ['v1'];
const subdomain = require('express-subdomain');

module.exports =  function loadAPI(app) {

  API_VERSION.forEach(function(version) {

    routeLoader(__dirname + '/' + version, app, function(router) {
      app.use(subdomain('api', router));
      // app.use(router);
    });

  });

};
