'use strict';

const routeLoader = require(__base + 'helpers/route-loader.js');
const errorMiddleware = require(__base + 'helpers/middleware/error');

module.exports =  function loadAuthRoutes(app) {

  routeLoader(__dirname, app, function(router) {
    app.use(router);
    app.use(errorMiddleware);
  });

};
