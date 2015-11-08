'use strict';

// '/' render the marketing website
module.exports =  function(router) {

  router.get('/', function(req, res) {
    res.render('index');
  });

  router.get('/app', function(req, res) {
    res.render('app');
  });

};
