'use strict';

var jwt = require('jwt-simple');

module.exports =  function(user, date) {
  let payload = {
    user: user._id,
    iat: new Date().getTime(),
    ex: expires(date || 7)
  };

  return jwt.encode(payload, process.env.SECRET);
};

function expires(days) {

  days = +days || 0;

  let date = new Date();

  return date.setDate(date.getDate() + days);
}
