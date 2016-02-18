'use strict';

const Doc = require(__base + 'models/docs');
const jwt = require('jwt-simple');
const NotFoundError = require(__base + 'helpers/errors/not-found');
const _ = require('lodash');

function getChapter(req, res, next) {

  let query = Doc.findOne({
    _id: req.params.docid,
    'chapters._id': req.params.chapterid
  });

  if(!_.isEmpty(req.query) && req.query.fields) {
    let fields = req.query.fields.split(',');
    console.log(fields);
    query.select(fields.join(' ') + ' chapters._id');
  }

  query.exec()
  .then(function(doc) {

    if(!doc) {
      throw new NotFoundError('no resource found with the id : ' + req.params.docid);
    }

    let chapter = doc.chapters.id(req.params.chapterid);

    return res.send(chapter);
  }).catch(function(err) {
    next(err);
  });

}


module.exports = getChapter;
