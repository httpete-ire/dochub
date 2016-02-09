'use strict';

const ValidationError = require(__base + 'helpers/errors/validation-error');
const NotFoundError = require(__base + 'helpers/errors/not-found');

const mailer = require(__base + 'mailer');

const Doc = require(__base + 'models/docs');

function pullrequestPost(req, res, next) {

  // required title, md, html
  req.checkBody('message', 'The pull request must contain a message').notEmpty();
  req.checkBody('markdown', 'The pull request must contain markdown').notEmpty();
  req.checkBody('html', 'The pull request must contain html').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    let err = new ValidationError(errors);
    return next(err);
  }

  Doc.findOne({
    _id: req.params.docid
  })
  .populate('owner', 'email settings')
  .exec()
  .then(function(doc) {

    let chapter = doc.chapters.id(req.params.chapterid);

    if(!chapter) {
      throw new NotFoundError('no chapter found by the id: ' + req.params.chapterid);
    }

    if(chapter.pullrequest.set) {
      let err = new Error();
      err.status = 304;
      throw err;
    }

    chapter.pullrequest = {
      set: true,
      message: req.body.message,
      content: {
        markdown: req.body.markdown,
        html: req.body.html
      }
    };

    return doc.save();
  })
  .then(function(doc) {

    if(doc.owner.settings.notifications) {

      let chapter = doc.chapters.id(req.params.chapterid);

      // send pull request email
      mailer.sendPullrequest({
        title: chapter.title,
        message: req.body.message
      })
      .then(function() {
        return res.sendStatus(200);
      });

    } else {
        return res.sendStatus(200);
    }

  })
  .catch(function(err) {
    return next(err);
  });

}

module.exports = pullrequestPost;
