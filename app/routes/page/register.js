'use strict';

module.exports =  function(router) {

  router.get('/register', function(req, res) {
    res.render('register');
  });

};
