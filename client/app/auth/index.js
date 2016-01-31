'use strict';

module.exports = function(module) {

  module
  .factory('AuthFactory', require('./auth.factory.js'))
  .factory('AuthService', require('./auth.service.js'))
  .factory('TokenFactory', require('./token.factory.js'))
  .factory('TokenInterceptor', require('./token.interceptor.js'));

};
