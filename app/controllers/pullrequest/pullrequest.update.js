'use strict';

const Doc = require(__base + 'models/docs');

function updatePullrequest(req, res, next) {

  Doc.findOne({
    _id: req.params.docid,
    owner: req.user
  })
  .exec(function(err, doc) {

    if(!doc) {
      return next({
        status: 404
      });
    }

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

    chapter.content = chapter.pullrequest.content;

    chapter.pullrequest = {
      set: false,
      message: null,
      content: {
        markdown: null,
        html: null
      }
    };

    doc.save(function(err, doc) {

      if(err) {
        return next(err);
      }

      return res.sendStatus(200);
    });
  });

}

module.exports = updatePullrequest;
