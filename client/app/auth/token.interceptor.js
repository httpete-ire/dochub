'use strict';

/*@ngInject*/
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

module.exports = TokenInterceptor;
