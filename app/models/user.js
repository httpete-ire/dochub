'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const SALT_FACTOR = 10;

var UserSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    index: true,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  created: {
    type: Date,
    default: Date.now
  },

  resetPasswordToken: {
    type: String
  },

  resetPasswordExpires: {
    type: Date
  }

});

// before saving the user model if the password has changed
// create a hash and reset password property to hash value
UserSchema.pre('save', function(next) {
  var user = this;

  // if password hasnt changed skip the hashing method
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {

    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }

      // change the users password to a hash of the password
      user.password = hash;
      next();
    });
  });
});

// compare hash values
UserSchema.methods.comparePasswords = function comparePasswords(password, cb) {
  bcrypt.compare(password, this.password, function(err, match) {
    if (err) {
      return cb(err);
    }

    cb(null, match);
  });
};

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);