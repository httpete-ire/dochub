'use strict';

/*@ngInject*/
function AuthService(dataService) {

  return {
    login : login,
    register: register,
    resetPassword: resetPassword
  };

  function resetPassword(email) {
    return dataService.post('http://dochub.co/forgot', {
      email: email
    });
  }

  function login(user) {
    return dataService.post('http://dochub.co/login', user);
  }

  function register(user) {
    return dataService.post('http://dochub.co/register', user);
  }

}

module.exports = AuthService;
