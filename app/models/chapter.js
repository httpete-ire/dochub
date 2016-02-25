const shortid = require('shortid');
const mongoose = require('mongoose');
const Version = require('./version.js');
const Schema = mongoose.Schema;

var ChapterSchema = new Schema({

  _id: {
    type: String,
    unique: true,
    default: shortid.generate,
    index: false
  },

  title: {
    type: String,
    required: true
  },

  created: {
    type: Date,
    default: Date.now
  },

  updated: {
    type: Date,
    default: Date.now
  },

  views: {
    type: Number,
    default: 0
  },

  content: {

    markdown: {
      type: String,
      default: null
    },

    html: {
      type: String,
      default: null
    }

  },

  versions: [Version.schema],

  pullrequest: {

    set: {
      type: Boolean,
      default: false
    },

    message: {
      type: String,
      default: null
    },

    content: {

      markdown: {
        type: String,
        default: null
      },

      html: {
        type: String,
        default: null
      }

    }

  }

});

module.exports = mongoose.model('Chapter', ChapterSchema);
