'use strict';

const User = require('./../../models/user.js');
const ValidationError = require('./../../helpers/errors/validation-error');
const resetToken = require('./../../helpers/auth/reset-token.js');
const Mailer = require('./../../mailer');

const mailer = new Mailer();

// '/' render the marketing website
module.exports =  function(router) {

  router.post('/forgot', function(req, res, next) {

    req.checkBody('email', 'Please provide a valid email').isEmail();

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

      user.resetPasswordToken = resetToken();
      user.resetPasswordExpires = Date.now() + 3600000; // expires in an hour


      user.save()
      .then(function() {
        return mailer.sendResetLink({
          email: user.email,
          token: user.resetPasswordToken,
          host: req.headers.host
        });
      }).then(function(info) {
        res.send(200);
      });

    });

  });

};
