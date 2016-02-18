'use strict';

const ValidationError = require(__base + 'helpers/errors/validation-error');
const NotFoundError = require(__base + 'helpers/errors/not-found');
const Version = require(__base + 'models/version');
const _ = require('lodash');

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

    _.each(doc.chapters, function(docChapter) {

      if(docChapter.title === req.body.title && docChapter._id !== req.params.chapterid) {
        let err = new Error('A chapter with that title already exists');
        err.status = 409;
        throw err;
      }

    });

    let version = new Version();

    version.markdown = chapter.content.markdown;
    version.versionNumber = (!chapter.versions.length) ? 1 : chapter.versions[chapter.versions.length - 1].versionNumber + 1;

    // ensure there can only be 5 versions
    if(chapter.versions.length === 5) {
      chapter.versions.shift();
    }

    chapter.versions.push(version);

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
