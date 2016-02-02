'use strict';

const Doc = require(__base + 'models/docs');
const jwt = require('jwt-simple');
const NotFoundError = require(__base + 'helpers/errors/not-found');
const _ = require('lodash');

const MARKDOWN_EXT = 'md';

function downloadChapter(req, res, next) {

  let query = Doc.findOne({
    _id: req.params.docid,
    'chapters._id': req.params.chapterid,
    owner: req.user
  });

  query.select('chapters._id chapters.title chapters.content.markdown')
  .exec()
  .then(function(doc) {

    if(!doc) {
      return res.render('404');
    }

    let chapter = doc.chapters.id(req.params.chapterid);

    if(!chapter) {
      return res.render('404');
    }

    let filename = chapter.title.toLowerCase().replace(/ /g, '-') + '.' + MARKDOWN_EXT;

    res.set({
      'Content-Disposition':'attachment; filename=\"' + filename + '\"'
    });

    return  res.send(chapter.content.markdown);
  });

}


module.exports = downloadChapter;
