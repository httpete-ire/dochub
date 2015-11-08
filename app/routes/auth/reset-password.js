'use strict';

const User = require('./../../models/user.js');

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
        return res.redirect('/');
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
    }).then(function(user) {

      if (!user) {
        return next({
          status: 404,
          message: 'reset token is invalid or has expired'
        });
      }

      user.password = req.body.password;

      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      return user.save();
    }).then(function(user) {
      return res.redirect('/app');
    });

  });

};
