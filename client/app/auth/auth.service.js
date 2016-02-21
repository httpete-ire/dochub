'use strict';

/*@ngInject*/
function AuthService(dataService, API_PATH) {

  return {
    login : login,
    register: register,
    resetPassword: resetPassword,
    requestNewPassword: requestNewPassword
  };

  function requestNewPassword(email) {
    return dataService.post(API_PATH + 'forgot', {
      email: email
    });
  }

  function login(user) {
    return dataService.post(API_PATH + 'login', user);
  }

  function register(user) {
    return dataService.post(API_PATH + 'register', user);
  }

  function resetPassword(token, password) {
    return dataService.post(API_PATH + 'reset/' + token, {
      password: password
    });
  }

}

module.exports = AuthService;
