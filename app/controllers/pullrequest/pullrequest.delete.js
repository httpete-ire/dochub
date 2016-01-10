'use strict';

const Doc = require(__base + 'models/docs');

function deletePullrequest(req, res, next) {

  Doc.findOne({
    _id: req.params.docid,
    owner: req.user
  })
  .exec()
  .then(function(doc) {

    doc.title = 'pete';

    let chapter = doc.chapters.id(req.params.chapterid);

    if(!chapter) {
      return next({
        status: 404
      });
    }

    // no pull request exists so return 'not modified' status
    if(!chapter.pullrequest.set) {
      return res.sendStatus(304);
    }

    chapter.pullrequest = {
      set: false,
      message: null,
      content: {
        markdown: null,
        html: null
      }
    };

    return doc.save();
  })
  .then(function(doc) {
    return res.sendStatus(200);
  }, function(err) {
    return next(err);
  });

}

module.exports = deletePullrequest;
