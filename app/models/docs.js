'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Chapter = require('./chapter.js');

let DocsSchema = new Schema({

  title: {
    type: String,
    required: true,
    index: true
  },

  desc: {
    type: String
  },

  created: {
    type: Date
  },

  updated: {
    type: Date
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },

  chapters: [
    Chapter.schema
  ],

  notifications: [

  ]

});

// ensure that a document is unique by the 'title' and 'user'
DocsSchema.index({
  title: 1,
  owner: 1
}, {
  unique: true
});

// when the document is saved, set the updated time to be the current time
// if the created property is undefined set it also
DocsSchema.pre('save', function(next) {

  let now = new Date();

  this.updated = now;

  if(!this.created) {
    this.created = now;
  }

  // call the next middle ware function
  next();
});

module.exports = mongoose.model('Docs', DocsSchema);
