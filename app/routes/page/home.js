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
      let chapter = (req.query.chapter) ? req.query.chapter : 0;
      let links = [];

      return res.render('doc', {
        docid: doc._id,
        chapter: doc.chapters[chapter]
      });
    });

  });

};
