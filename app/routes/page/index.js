const routeLoader = require('./../../helpers/route-loader.js');
const errorMiddleware = require('./../../helpers/middleware/error');

module.exports =  function pageRouteLoader(app) {
  routeLoader(__dirname, app, function(router) {
    app.use(router);
    app.use(errorMiddleware);
  });
};
