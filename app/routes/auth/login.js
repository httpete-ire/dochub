'use strict';

const User = require('./../../models/user.js');
const ValidationError = require('./../../helpers/errors/validation-error');
const createToken = require('./../../helpers/auth/auth-token');

// '/' render the marketing website
module.exports =  function(router) {

  router.post('/login', function(req, res, next) {

    req.checkBody('email', 'Please provide a valid email').isEmail();
    req.checkBody('password', 'Password must be set').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
      let err = new ValidationError(errors);
      return next(err);
    }

    User.findOne({email: req.body.email}, function(err, user) {

      if (err) {
        return next(err);
      }

      if (!user) {
        return next({
          message: 'no user found with the email ' + req.body.email,
          status: 404
        });
      }

      user.comparePasswords(req.body.password, function(err, match) {

        if (!match) {
          return next({
            message: 'INvalid email and/or password',
            status: 422
          });
        }

        let token = createToken(user);

        return res.json({
          token: token,
          user: {
            _id: user._id,
            name: user.name
          }
        });
      });

    });

  });

};
