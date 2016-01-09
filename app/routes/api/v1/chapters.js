'use strict';

const authMiddleWare = require(__base + 'helpers/middleware/auth');
const chaptersController = require(__base + 'controllers/chapters');
const chapterController = require(__base + 'controllers/chapter');

module.exports =  function(router) {

  router
  .route('/docs/:docid/chapters')
  .post(authMiddleWare, chaptersController.post);

  router
  .route('/docs/:docid/chapters/:chapterid')
  .delete(authMiddleWare, chapterController.delete)
  .get(chapterController.get);

};
