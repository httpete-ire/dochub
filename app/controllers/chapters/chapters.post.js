'use strict';

const Doc = require(__base + 'models/docs');
const Chapter = require(__base + 'models/chapter');
const ValidationError = require(__base + 'helpers/errors/validation-error');

const updateOptions = {
  new: true
};

function updateChapters(req, res, next) {

  // required title, md, html
  req.checkBody('title', 'The chapter title is required').notEmpty();
  req.checkBody('markdown', 'The chapters markdown is required').notEmpty();
  req.checkBody('html', 'The chapters HTML is required').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    let err = new ValidationError(errors);
    return next(err);
  }

  let chapter = new Chapter();
  chapter.title = req.body.title;
  chapter.content.markdown = req.body.markdown;
  chapter.content.html = req.body.html;

  console.log(chapter);

  let docId = req.params.docid;

  let query = Doc.update({
    $and: [
      {
        _id: docId
      },
      {
        owner: req.user
      },
      {
        'chapters.title': {
          $ne: chapter.title
        }
      }
    ]
  },
  {
    $push: {
      chapters : chapter
    }
  },
  updateOptions);

  query.exec()
  .then(function(value) {

    if(value.nModified === 0) {
      return res.sendStatus(409);
    }

    return res.json({
      id: chapter._id
    });

  })
  .catch(function(err) {
    return next(err);
  });
}

module.exports = updateChapters;
