(function() {
  'use strict';

  angular
  .module('docd')
  .factory('AuthService', AuthService);

  function AuthService(dataService) {

    return {
      login : login,
      register: register
    };

    function login(user) {
      return dataService.post('/login', user);
    }

    function register(user) {
      return dataService.post('/register', user);
    }

  }

  AuthService.$inject = ['dataService'];

})();
