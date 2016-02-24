'use strict';

const Doc = require(__base + 'models/docs');
const NotFoundError = require(__base + 'helpers/errors/not-found');

function getChapters(req, res, next) {

  // let select = '-chapters.pullrequest.content -chapters.content';

  let select = 'published title chapters._id chapters.title chapters.views chapters.updated chapters.versions._id chapters.versions.created chapters.versions.versionNumber chapters.pullrequest.set';

  if(req.query.pullrequest){
    select = '';
  }

  Doc.findOne({
    _id: req.params.docid
  })
  .select(select)
  .exec()
  .then(function(doc) {

    if(!doc) {
      throw new NotFoundError('no document resource found');
    }

    return res.send({
      _id: doc._id,
      title: doc.title,
      published: doc.published,
      chapters: doc.chapters
    });

  })
  .catch(function(err) {
    return next(err);
  });

}

module.exports = getChapters;
