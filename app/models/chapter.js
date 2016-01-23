const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ChapterSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  created: {
    type: Date,
    default: Date.now
  },

  updated: {
    type: Date
  },

  views: {
    type: Number,
    default: 0
  },

  likes: {
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
