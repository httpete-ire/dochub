const routeLoader = require(__base + 'helpers/route-loader.js');

module.exports =  function pageRouteLoader(app) {
  routeLoader(__dirname, app, function(router) {
    app.use(router);
  });
};
