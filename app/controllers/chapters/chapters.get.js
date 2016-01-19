'use strict';

const Doc = require(__base + 'models/docs');
const NotFoundError = require(__base + 'helpers/errors/not-found');

function getChapters(req, res, next) {

  let select = '-chapters.pullrequest.content -chapters.content';

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

    return res.send(doc.chapters);
  })
  .catch(function(err) {
    return next(err);
  });

}

module.exports = getChapters;
