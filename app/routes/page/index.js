const routeLoader = require('./../../lib/route-loader.js');

module.exports =  function pageRouteLoader(app) {
  routeLoader(__dirname, app, function(router) {
    app.use(router);
  });
};
