const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Chapter = require('./chapter.js');

var DocsSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  desc: {
    type: String
  },

  created: {
    type: Date,
    default: Date.now
  },

  updated: {
    type: Date
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  chapters: [
    Chapter.schema
  ],

  notifications: [

  ]

});

module.exports = mongoose.model('Docs', DocsSchema);
