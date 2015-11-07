'use strict';

const inherit = require('util').inherits;

function ValidationError(errors) {
  Error.captureStackTrace(this, this.constructor);
  this.type = this.constructor.name;
  this.status = 400;
  this.message = errors || '';
}

inherit(ValidationError, Error);

module.exports =  ValidationError;
