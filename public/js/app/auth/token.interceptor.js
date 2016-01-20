(function() {
  'use strict';

  angular
  .module('docd')
  .factory('TokenInterceptor', TokenInterceptor);

  function TokenInterceptor(TokenFactory) {
    return {
      request: request
    };

    function request(config) {

      config.headers = config.headers || {};

      var token = TokenFactory.getToken();

      if(token) {
        config.headers.auth = 'Bearer ' + token;
      }

      return config;
    }
  }

  TokenInterceptor.$inject = ['TokenFactory'];

})();
