'use strict';

const Doc = require(__base + '/models/docs');
const NotFoundError = require(__base + 'helpers/errors/not-found');


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
      throw new NotFoundError('no document resource found with that id');
    }

    return res.sendStatus(200);
  })
  .catch(function(err) {
    return next(err);
  });
}

module.exports = deleteDoc;
