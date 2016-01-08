'use strict';

const authMiddleWare = require(__base + 'helpers/middleware/auth');
const chapterController = require(__base + 'controllers/chapters');

module.exports =  function(router) {

  router
  .route('/docs/:docid/chapters')
  .post(authMiddleWare, chapterController.post);

};
