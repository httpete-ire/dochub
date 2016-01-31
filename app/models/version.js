const shortid = require('shortid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var VersionSchema = new Schema({

  _id: {
    type: String,
    unique: true,
    default: shortid.generate,
    index: false
  },

  created: {
    type: Date,
    default: Date.now
  },

  markdown: {
    type: String
  },

  versionNumber: {
    type: Number
  }

});

module.exports = mongoose.model('Version', VersionSchema);
