'use strict';

const ValidationError = require(__base + 'helpers/errors/validation-error');
const ConflictError = require(__base + 'helpers/errors/conflict-error');
const Doc = require(__base + 'models/docs');

function docsPost(req, res, next) {

  req.checkBody('title', 'The document title is required').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    let err = new ValidationError(errors);
    return next(err);
  }

  let doc = new Doc();

  doc.title = req.body.title;
  doc.desc = req.body.desc || '';
  doc.owner = req.user;

  doc.save(function(error) {

    if(error) {

      console.log(error);

      // if the error is due to a duplicate property
      if(error.code === 11000) {
        error = new ConflictError({
          message: 'A document called ' + req.body.title + ' already exists, please try a different name'
        });
      }

      return next(error);
    }

    return res.sendStatus(200);
  });

}

module.exports = docsPost;
