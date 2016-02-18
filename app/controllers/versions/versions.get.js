'use strict';

const Doc = require(__base + 'models/docs');
const NotFoundError = require(__base + 'helpers/errors/not-found');
const _ = require('lodash');

function getChapter(req, res, next) {

  let query = Doc.findOne({
    _id: req.params.docid,
    'chapters._id': req.params.chapterid
  });

  query.select('chapters._id chapters.title chapters.updated chapters.content.markdown chapters.versions');

  query.exec()
  .then(function(doc) {

    if(!doc) {
      throw new NotFoundError('no document resource found with the id : ' + req.params.docid);
    }

    let chapter = doc.chapters.id(req.params.chapterid);

    if(!chapter) {
      throw new NotFoundError('no chapter resource found with the id : ' + req.params.chapterid);
    }

    let version = chapter.versions.id(req.params.versionid);

    if(!version) {
      throw new NotFoundError('no version resource found with the id : ' + req.params.versionid);
    }

    return res.send({
      chapter: {
        _id: chapter._id,
        markdown: chapter.content.markdown,
        updated: chapter.updated,
        title: chapter.title
      },
      version: version
    });
  }).catch(function(err) {
    next(err);
  });

}


module.exports = getChapter;
