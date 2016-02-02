const routeLoader = require(__base + 'helpers/route-loader.js');
const subdomain = require('express-subdomain');

module.exports =  function pageRouteLoader(app) {
  routeLoader(__dirname, app, function(router) {
    app.use(subdomain('docs', router));
  });
};
