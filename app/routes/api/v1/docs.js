'use strict';

const docController = require(__base + '/controllers/doc');
const docsController = require(__base + '/controllers/docs');
const authMiddleWare = require(__base + '/helpers/middleware/auth');

module.exports =  function(router) {

  router
  .route('/docs')
  .post(authMiddleWare, docsController.post)
  .get(authMiddleWare, docsController.get);

  router
  .route('/docs/:docid')
  .delete(authMiddleWare, docController.delete)
  .put(authMiddleWare, docController.update);

};
