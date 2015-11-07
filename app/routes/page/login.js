'use strict';

module.exports =  function(router) {

  router.get('/login', function(req, res) {
    res.render('login');
  });

  router.post('/login', function(req, res) {
    res.render('app', {
      token: 'working'
    });
  });

};
