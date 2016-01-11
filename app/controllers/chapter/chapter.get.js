'use strict';

const Doc = require(__base + 'models/docs');
var jwt = require('jwt-simple');

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



    query = Doc.findOneAndUpdate(where, update, {
      new: true
    });

  }

  // select which properites to return
  query.select('-chapters.pullrequest.content');

  // execute the query
  query.exec(function(err, doc) {

    if(doc && doc.chapters) {
      let chapter = doc.chapters.id(req.params.chapterid);
      return res.send(chapter);
    } else {

      return next({
        message: 'no chapter resource found with that id',
        status: 404
      });
    }

  });

}

module.exports = getChapter;