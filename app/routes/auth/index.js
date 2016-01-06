'use strict';

const routeLoader = require(__base + 'helpers/route-loader.js');

module.exports =  function loadAuthRoutes(app) {

  routeLoader(__dirname, app, function(router) {
    app.use(router);
  });

};
