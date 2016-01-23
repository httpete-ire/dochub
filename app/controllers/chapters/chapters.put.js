'use strict';

const Doc = require(__base + 'models/docs');
const _ = require('lodash');
const NotFoundError = require(__base + 'helpers/errors/not-found');
const ValidationError = require(__base + 'helpers/errors/validation-error');

function updateChapters(req, res, next) {

  // required title, md, html
  req.checkBody('chapters', 'An array of chapters id is required').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    let err = new ValidationError(errors);
    return next(err);
  }


  let query = Doc.findOne({
    _id: req.params.docid,
    owner: req.user
  });

  query
  .select('chapters')
  .exec()
  .then(function(doc) {

    if(!doc) {
      throw new NotFoundError('no document resource found');
    }

    let newChapters = [];

    _.each(req.body.chapters, function(chapterId) {
      let chapter = doc.chapters.id(chapterId);

      if(!chapter) {
        throw new NotFoundError('no chapter with the id : ' + chapterId + ' , the update action was abandoned');
      }
      
      newChapters.push(chapter);
    });

    doc.chapters = newChapters;

    return doc.save();
  })
  .then(function() {
    return res.sendStatus(200);
  })
  .catch(function(err) {
    return next(err);
  });
}

module.exports = updateChapters;
