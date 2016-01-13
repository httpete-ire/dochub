'use strict';

const ValidationError = require(__base + 'helpers/errors/validation-error');
const NotFoundError = require(__base + 'helpers/errors/not-found');

const Doc = require(__base + 'models/docs');

function updateChapter(req, res, next) {

  // title, content: markdown, content: html
  req.checkBody('title', 'The chapter title is required').notEmpty();
  req.checkBody('markdown', 'The chapters markdown is required').notEmpty();
  req.checkBody('html', 'The chapters HTML is required').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    let err = new ValidationError(errors);
    return next(err);
  }

  let query = Doc.findOne({
    _id: req.params.docid,
    owner: req.user
  });

  query.exec()
  .then(function(doc) {

    if(!doc) {
      throw new NotFoundError('no document found with that id');
    }

    let chapter = doc.chapters.id(req.params.chapterid);

    if(!chapter) {
      throw new NotFoundError('no chapter found with that id');
    }

    chapter.title = req.body.title;
    chapter.content.markdown = req.body.markdown;
    chapter.content.html = req.body.html;
    chapter.updated = Date.now();

    return doc.save();
  })
  .then(function(doc) {
    return res.sendStatus(200);
  })
  .catch(function(err) {
    return next(err);
  });

}

module.exports = updateChapter;
