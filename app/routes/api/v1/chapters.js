'use strict';

const authMiddleWare = require(__base + 'helpers/middleware/auth');

const chaptersController = require(__base + 'controllers/chapters');
const chapterController = require(__base + 'controllers/chapter');
const pullrequestController = require(__base + 'controllers/pullrequest');
const versionController = require(__base + 'controllers/versions');

module.exports =  function(router) {

  router
  .route('/docs/:docid/chapters')
  .post(authMiddleWare, chaptersController.post)
  .put(authMiddleWare, chaptersController.put)
  .get(authMiddleWare, chaptersController.get);

  router
  .route('/docs/:docid/chapters/:chapterid')
  .delete(authMiddleWare, chapterController.delete)
  .get(chapterController.get)
  .put(authMiddleWare, chapterController.update);

  router
  .route('/docs/:docid/chapters/:chapterid/pullrequest')
  .post(pullrequestController.post)
  .delete(authMiddleWare, pullrequestController.delete)
  .put(authMiddleWare, pullrequestController.update);

  router
  .route('/docs/:docid/chapters/:chapterid/versions/:versionid')
  .get(authMiddleWare, versionController.get);

};
