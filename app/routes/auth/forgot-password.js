'use strict';

const User = require('./../../models/user.js');
const ValidationError = require('./../../helpers/errors/validation-error');
const resetToken = require('./../../helpers/auth/reset-token.js');
const mailer = require('./../../mailer');

// '/' render the marketing website
module.exports =  function(router) {

  router.get('/forgot', function(req, res, next) {
    return res.render('forgot');
  });

  router.post('/forgot', function(req, res, next) {

    req.checkBody('email', 'Please provide a valid email').isEmail();

    let errors = req.validationErrors();

    if (errors) {
      let err = new ValidationError(errors);
      return next(err);
    }

    User.findOne({email: req.body.email}).exec()
    .then(function(user) {

      if (!user) {
        throw new NotFoundError('no user found with the email ' + req.body.email);
      }

      user.resetPasswordToken = resetToken();
      user.resetPasswordExpires = Date.now() + 360000; // expires in an hour
      return user.save();
    })
    .then(function(user) {
      return mailer.sendResetLink({
        email: user.email,
        token: user.resetPasswordToken,
        host: req.headers.host
      });
    })
    .then(function() {
      return res.sendStatus(200);
    })
    .catch(function(err) {
      return next(err);
    });

    });

};
