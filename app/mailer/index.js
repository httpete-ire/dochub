'use strict';

const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const Q = require('Q');
const compileTemplate = require('./templates').compileTemplate;

const options = {
  auth: {
    api_user: process.env.SENDGRID_USER,
    api_key: process.env.SENDGRID_KEY
  }
}

// create object that can send emails using nodemailer and sendgrid
function Mailer(opts) {
  this.options = opts || options;
  this.client = nodemailer.createTransport(sgTransport(this.options));
}

Mailer.prototype.sendResetLink = function(data) {

  let emailData = {
    token: data.token,
    url: data.url,
    host: data.host,
    email: data.email
  };

  let email = {
    from: 'donotreply@docd.com',
    to: (process.env.NODE_ENV === 'dev') ? 'redmondp@gmail.com': emailData.email,
    subject: 'password reset',
    html: compileTemplate('forgot', emailData)
  };

  return this.send(email);
};

Mailer.prototype.send = function(email) {
  let deferred = Q.defer();

  this.client.sendMail(email, function(err, info) {

    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(info);
    }

  });

  return deferred.promise;
};

module.exports =  Mailer;