'use strict';

const ValidationError = require(__base + 'helpers/errors/validation-error');
const NotFoundError = require(__base + 'helpers/errors/not-found');
const Doc = require(__base + 'models/docs');

const updateOptions = {
  new: true
};

function updateDoc(req, res, next) {

  req.checkBody('title', 'The document title is required').notEmpty();
  req.checkBody('desc', 'The document description is required').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    let err = new ValidationError(errors);
    return next(err);
  }

  let docId = req.params.docid;

  let updateValues = {
      title: req.body.title,
      desc: req.body.desc,
      updated: new Date()
  };

  let query = Doc.findOneAndUpdate({
    $and: [
      {
        _id: docId
      },
      {
        owner: req.user
      }
    ]
  },
  updateValues,
  updateOptions);

  query.exec()
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

module.exports = updateDoc;
