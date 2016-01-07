'use strict';

const Doc = require(__base + 'models/docs');
const _ = require('lodash');

function getDoc(req, res, next) {

  // set up query
  let docQuery = Doc.find().where({
    owner: req.user
  });

  // select certain fields of data
  if(!_.isEmpty(req.query) && req.query.fields) {

    let fields = req.query.fields.split(',');
    docQuery.select(fields.join(' '));

    // return all fields of a Doc, populate the owner field
  }

  // execute query and return results
  docQuery.exec().then(function(docs) {
    return res.send(docs);
  });
}

module.exports = getDoc;
