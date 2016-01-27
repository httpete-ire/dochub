'use strict';

const shortid = require('shortid');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const Q = require('q');

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
    type: String,
    default: null
  },

  resetPasswordExpires: {
    type: Date,
    default: null
  },

  settings: {

    notifications: {
      type: Boolean,
      default: true
    }

  }

});

// before saving the user model if the password has changed
// create a hash and reset password property to hash value
UserSchema.pre('save', function(next) {
  var user = this;

  // if password hasnt changed skip the hashing method
  if (!user.isModified('password')) {
    return next();
  }

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

UserSchema.methods.comparePasswords = function(password) {
  let deferred = Q.defer();

  bcrypt.compare(password, this.password, function(err, match) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(match);
    }
  });

  return deferred.promise;
};

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
