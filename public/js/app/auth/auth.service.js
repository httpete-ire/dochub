(function() {
  'use strict';

  angular
  .module('docd')
  .factory('AuthService', AuthService);

  function AuthService(dataService) {

    return {
      login : login
    };

    function login(user) {
      return dataService.post('/login', user);
    }

  }

  AuthService.$inject = ['dataService'];

})();
