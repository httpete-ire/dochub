'use strict';

const Doc = require(__base + 'models/docs');
var jwt = require('jwt-simple');
const NotFoundError = require(__base + 'helpers/errors/not-found');


const update = {
  $inc: {
    'chapters.$.views': 1
  }
};

function getChapter(req, res, next) {

  // where statement for query
  let where = {
    _id: req.params.docid,
    'chapters._id': req.params.chapterid
  };

  let query;

  // check if a user is logged in to the system
  // if a user is found and they are the owner of the document/chapter
  // return the full object including the pullrequest, the view count
  // is also not incremented
  if(req.headers.auth) {

    // seperate the token from the bearer
    let token = req.headers.auth.split(' ')[1];

    try {

      let decodedToken = jwt.decode(token, process.env.SECRET);

      where.owner = decodedToken.user;

      // logged in so dont increment view count
      query = Doc.findOne(where);

    } catch (err) {

      query = Doc.findOneAndUpdate(where, update, {
        new: true
      });

    }

  } else {
    query = Doc.findOneAndUpdate(where, update, {
      new: true
    });
  }

  if(!where.owner) {
    query.select('-chapters.pullrequest.content');
  }

  query.exec().then(function(doc) {

    if(doc && doc.chapters) {
      let chapter = doc.chapters.id(req.params.chapterid);
      return res.send(chapter);
    } else {
      throw new NotFoundError('no chapter resource found with that id');
    }

  }).catch(function(err) {
    next(err);
  });

}

module.exports = getChapter;
