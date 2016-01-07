'use strict';

const docController = require(__base + '/controllers/docs');
const authMiddleWare = require(__base + '/helpers/middleware/auth');

module.exports =  function(router) {

  router
  .route('/docs')
  .post(authMiddleWare, docController.post);

};
