'use strict';

const Doc = require(__base + 'models/docs');

function deleteChapter(req, res, next) {

  let query = Doc.update({
    $and: [
      {
        _id: req.params.docid
      }, {
        owner: req.user
      }
    ]
  }, {
    $pull: {
      chapters: {
        _id: req.params.chapterid
      }
    }
  }, {
    new: true
  });

  query.exec()
  .then(function(value) {

    if(value.nModified === 0) {
      return res.sendStatus(404);
    }

    return res.sendStatus(200);
  })
  .catch(function(err) {
    return next(err);
  });

}

module.exports = deleteChapter;
