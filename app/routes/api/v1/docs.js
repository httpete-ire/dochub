module.exports =  function(router) {

  router.route('/docs').get(function(req, res) {
    res.json({ title: 'My first book'});
  });

};
