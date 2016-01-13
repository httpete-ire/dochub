'use strict';

const User = require('./../../models/user.js');
const ValidationError = require('./../../helpers/errors/validation-error');
const NotFoundError = require(__base + 'helpers/errors/not-found');
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

    let u = null;

    User.findOne({email: req.body.email})
    .exec()
    .then(function(user) {

      if (!user) {
        throw new NotFoundError('no user found with the email ' + req.body.email);
      }

      u = user;

      return user.comparePasswords(req.body.password);

    })
    .then(function(match) {
      if(!match) {
        let err = new Error();
        err.message = 'Invalid email and/or password';
        err.status = 422;
        throw err;
      }

      let token = createToken(u);

      return res.json({
        token: token,
        user: {
          _id: u._id,
          name: u.name
        }
      });

    })
    .catch(function(err) {
      return next(err);
    });

  });

};
