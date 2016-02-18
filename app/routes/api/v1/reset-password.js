'use strict';

const User = require(__base + '/models/user.js');

const ValidationError = require(__base + '/helpers/errors/validation-error');
const NotFoundError = require(__base + 'helpers/errors/not-found');

// '/' render the marketing website
module.exports =  function(router) {

  router.get('/reset/:token', function(req, res, next) {

    User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: {
        $gt: Date.now()
      }
    }).then(function(user) {

      if (!user) {
        return res.render('forgot', {
          error: 'Invalid token'
        });
      }

      return res.render('reset');
    });

  });

  router.post('/reset/:token', function(req, res, next) {

    req.checkBody('password', 'Password must be set').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
      let err = new ValidationError(errors);
      return next(err);
    }

    User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: {
        $gt: Date.now()
      }
    })
    .then(function(user) {

      if (!user) {
        throw new NotFoundError('reset token is invalid or has expired');
      }

      user.password = req.body.password;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      return user.save();
    })
    .then(function(user) {
      return res.redirect('/app');
    })
    .catch(function(err) {
      return next(err);
    });

  });

};
