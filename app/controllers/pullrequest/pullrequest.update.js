'use strict';

const Doc = require(__base + 'models/docs');
const NotFoundError = require(__base + 'helpers/errors/not-found');
const ValidationError = require(__base + 'helpers/errors/validation-error');
const Version = require(__base + 'models/version');


function updatePullrequest(req, res, next) {

  req.checkBody('markdown', 'The pull request must contain markdown').notEmpty();
  req.checkBody('html', 'The pull request must contain html').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    let err = new ValidationError(errors);
    return next(err);
  }

  Doc.findOne({
    _id: req.params.docid,
    owner: req.user
  })
  .exec()
  .then(function(doc) {

    if(!doc) {
      throw new NotFoundError('no document resource found with that id');
    }

    let chapter = doc.chapters.id(req.params.chapterid);

    if(!chapter) {
      throw new NotFoundError('no chapter resource found with that id');
    }

    if(!chapter.pullrequest.set) {
      let error = new Error();
      error.status = 304;
      throw error;
    }

    let version = new Version();

    version.markdown = chapter.content.markdown;
    version.versionNumber = (!chapter.versions.length) ? 1 : chapter.versions[chapter.versions.length - 1].versionNumber + 1;

    // ensure there can only be 5 versions
    if(chapter.versions.length === 5) {
      chapter.versions.shift();
    }

    chapter.versions.push(version);

    chapter.content = {
      markdown: req.body.markdown,
      html: req.body.html
    };

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
  .then(function() {
    return res.sendStatus(200);
  })
  .catch(function(err) {
    return next(err);
  });

}

module.exports = updatePullrequest;
