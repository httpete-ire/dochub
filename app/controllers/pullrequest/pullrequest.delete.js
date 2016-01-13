'use strict';

const Doc = require(__base + 'models/docs');
const NotFoundError = require(__base + 'helpers/errors/not-found');

function deletePullrequest(req, res, next) {

  Doc.findOne({
    _id: req.params.docid,
    owner: req.user
  })
  .exec()
  .then(function(doc) {

    let chapter = doc.chapters.id(req.params.chapterid);

    if(!chapter) {
      throw new NotFoundError('no chapter found with that id');
    }

    // no pull request exists so return 'not modified' status
    if(!chapter.pullrequest.set) {
      let error = new Error();
      error.status = 304;
      throw error;
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
  })
  .catch(function(err) {
    return next(err);
  });

}

module.exports = deletePullrequest;
