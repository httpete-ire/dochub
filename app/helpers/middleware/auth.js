'use strict';

const jwt = require('jwt-simple');
const AuthError = require(__base + '/helpers/errors/auth-error');

module.exports = function(req, res, next) {

  if(req.headers.auth || req.query.token) {

    let token = (req.query.token) ? req.query.token : req.headers.auth.split(' ')[1];

    try {

      let decodedToken = jwt.decode(token, process.env.SECRET);

      // set the logged in user on the request object
      req.user = decodedToken.user;

      // valid token and user
      return next();
    } catch (err) {
      return next(new AuthError());
    }

  } else {
    return next(new AuthError());
  }

};
