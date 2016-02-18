'use strict';

const inherit = require('util').inherits;

function AuthError() {
  Error.captureStackTrace(this, this.constructor);
  this.type = this.constructor.name;
  this.status = 401;
  this.message = 'Unauthorized access to perform that action, please login';
}

inherit(AuthError, Error);

module.exports = AuthError;
