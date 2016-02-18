'use strict';

const inherit = require('util').inherits;
const _ = require('lodash');

function ConflictError(errors) {
  Error.captureStackTrace(this, this.constructor);
  this.type = this.constructor.name;
  this.status = 409;

  // if not in dev mode
  if (process.env.NODE_ENV !== 'dev') {

    _.forOwn(errors, function(value, key) {
      delete errors[key].properties;
      delete errors[key].stack;
    });
  }

  this.message = errors.message || errors || '';
}

inherit(ConflictError, Error);

module.exports =  ConflictError;
