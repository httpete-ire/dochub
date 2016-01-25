'use strict';

const Doc = require(__base + 'models/docs');
const _ = require('lodash');

module.exports =  function(router) {

  router.get('/', function(req, res) {
    res.render('index');
  });

  router.get('/app', function(req, res) {
    res.render('app');
  });

  router.get('/doc/:id', function(req, res, next) {

    let docId = req.params.id;

    let query = Doc.findOne().where({
      _id: docId
    });

    // select certain fields of data
    if(!_.isEmpty(req.query) && req.query.fields) {

      let fields = req.query.fields.split(',');
      query.select(fields.join(' '));

      // return all fields of a Doc, populate the owner field
    }

    query.exec().then(function(doc) {
      let chapter = (req.query.chapter) ? req.query.chapter : 0;
      let links = [];

      console.log(req.hostname);

      _.each(doc.chapters, function(docChapter, index) {
        links.push({
          title: docChapter.title,
          href: req.hostname + ':4000/doc/' + doc._id + '/' + index
        });
      });

      console.log(doc.chapters[chapter].pullrequest);

      return res.render('doc', {
        docid: doc._id,
        links: links,
        chapter: doc.chapters[chapter]
      });
    });

  });

};
