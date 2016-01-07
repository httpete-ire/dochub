'use strict';

const Doc = require(__base + '/models/docs');

function deleteDoc(req, res, next) {

  let docId = req.params.docid;

  // delete a document based on the id param and ensure the owner is
  // the only user who can delete that document resource
  Doc.findOneAndRemove({
    $and: [
      {
        _id: docId
      },
      {
        owner: req.user
      }
    ]
  })
  .exec()
  .then(function(doc) {

    // no document found so return 404 error
    if(!doc) {
      return next({
        message: 'no document resource found with that id',
        status: 404
      });
    }

    return res.sendStatus(200);
  });
}

module.exports = deleteDoc;
