'use strict';

/*@ngInject*/
function AuthService(dataService) {

  return {
    login : login,
    register: register
  };

  function login(user) {
    return dataService.post('http://localhost:4000/login', user);
  }

  function register(user) {
    return dataService.post('http://localhost:4000/register', user);
  }

}

module.exports = AuthService;
