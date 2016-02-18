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
          href: req.hostname +  '/' + docId + '/' + (index + 1),
          active: (index + 1 === +req.params.chapternumber) ? 'active__link' : ''
        });

      });

      return res.render('doc', {
        doc: doc,
        chapter: chapter,
        links: links,
        chapterNumber: req.params.chapternumber
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

};
