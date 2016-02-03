'use strict';

const Doc = require(__base + 'models/docs');
const _ = require('lodash');

function getDocument(req, res, next) {
  return res.send('hello');
}

module.exports =  function(router) {

  router.get('/:id/:chapternumber', function(req, res, next) {

    let docId = req.params.id;

    let query = Doc.findOne().where({
      _id: docId,
      published: true
    });

    query.select('title chapters._id chapters.title chapters.updated chapters.content.html chapters.pullrequest.set');

    query.exec().then(function(doc) {

      if(!doc) {
        throw Error(' no document found');
      }

      let chapter = doc.chapters[req.params.chapternumber - 1];

      if(!chapter) {
        throw Error('no chapter found');
      }

      let links = [];

      _.each(doc.chapters, function(chap, index) {

        links.push({
          title: chap.title,
          href: req.hostname +  ':4000/' + docId + '/' + (index + 1)
        });

      });

      return res.render('doc', {
        doc: doc,
        chapter: chapter,
        links: links
      });

    })
    .catch(function(err) {
      return res.render('404');
    });

  });

  // if requesting the document redirect to include the first chapter
  router.get('/:id', function(req, res, next) {
    return res.redirect('/' + req.params.id +'/1');
  });

  router.get('/:id', function(req, res, next) {

    let docId = req.params.id;

    let query = Doc.findOne().where({
      _id: docId,
      published: true
    });

    // select certain fields of data
    if(!_.isEmpty(req.query) && req.query.fields) {

      let fields = req.query.fields.split(',');
      query.select(fields.join(' '));

      // return all fields of a Doc, populate the owner field
    }

    query.exec().then(function(doc) {

      if(!doc) {
        return res.render('404');
      }

      let chapter = (req.query.chapter) ? req.query.chapter : 0;
      let links = [];

      return res.render('doc', {
        docid: doc._id,
        chapter: doc.chapters[chapter]
      });

    });

  });

};
