'use strict';

// '/' render the marketing website
module.exports =  function(router) {

  router.get('/', function(req, res) {
    res.render('index');
  });

};
