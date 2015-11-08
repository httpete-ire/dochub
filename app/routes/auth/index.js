'use strict';

const routeLoader = require('./../../helpers/route-loader.js');
const errorMiddleware = require('./../../helpers/middleware/error');

module.exports =  function loadAuthRoutes(app) {

  routeLoader(__dirname, app, function(router) {
    app.use(router);
    app.use(errorMiddleware);
  });

};
