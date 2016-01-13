'use strict';

const inherit = require('util').inherits;
const _ = require('lodash');

function NotFoundError(msg) {
  Error.captureStackTrace(this, this.constructor);
  this.type = this.constructor.name;
  this.status = 404;
  this.message = msg || 'resource not found';
}

inherit(NotFoundError, Error);

module.exports = NotFoundError;
