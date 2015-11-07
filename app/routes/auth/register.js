'use strict';

const User = require('./../../models/user.js');
const ValidationError = require('./../../helpers/errors/validation-error');
const ConflictError = require('./../../helpers/errors/conflict-error');


// '/' render the marketing website
module.exports =  function(router) {

  router.post('/register', function(req, res, next) {

    req.checkBody('name', 'name is required').notEmpty();
    req.checkBody('email', 'Please provide a valid email').isEmail();
    req.checkBody('password', 'Password must be set').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
      let err = new ValidationError(errors);
      return next(err);
    }

    // create new user
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    user.save(function handleUserSave(err, user) {

      if (err) {

        let error = null;

        if (err.name === 'ValidationError') {
          error = new ConflictError(err.errors);
        } else {
          error = err;
        }

        return next(error);
      }

      return res.sendStatus(200);
    });

  });

};
