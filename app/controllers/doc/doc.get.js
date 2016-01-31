'use strict';

const Doc = require(__base + 'models/docs');
const _ = require('lodash');

function getDoc(req, res, next) {

  let docId = req.params.docid;

  let query = Doc.find().where({
    _id: docId
  });

  // select certain fields of data
  if(!_.isEmpty(req.query) && req.query.fields) {

    let fields = req.query.fields.split(',');
    query.select(fields.join(' '));

    // return all fields of a Doc, populate the owner field
  }

  query.exec()
  .then(function(doc) {
    return res.send(doc[0]);
  })
  .catch(function(err) {
    return next(err);
  });
}

module.exports = getDoc;
