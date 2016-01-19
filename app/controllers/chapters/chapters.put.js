'use strict';

const Doc = require(__base + 'models/docs');
const _ = require('lodash');

const obj = {
  '56957e4cd3d04c8516fd5591': 'pete'
};

function updateChapters(req, res, next) {

  console.log(req.body);

  let query = Doc.findOne({
    _id: req.params.docid,
    owner: req.user
  });

  query
  .select('chapters.title chapters._id')
  .exec()
  .then(function(doc) {

    _.each(doc.chapters, function(chapter, index) {
      console.log(chapter);
      // console.log(req.body.chapters[chapter._id]);
      // chapter.title = req.body.chapters[chapter._id];
    });

    console.log(doc);

    return res.send(doc);
  }).catch(function(err) {
    return next(err);
  });
}

module.exports = updateChapters;
