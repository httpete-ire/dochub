'use strict';

const bcrypt = require('bcryptjs');

const SALT_FACTOR = 5;

module.exports =  function genreateRestToken() {
  return bcrypt.genSaltSync(SALT_FACTOR);
};
