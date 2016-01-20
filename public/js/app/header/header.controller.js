(function() {

  'use strict';

  angular.module('docd')
  .controller('HeaderController', HeaderController);

  function HeaderController(AuthFactory, TokenFactory, $state, $rootScope) {
    var vm = this;
    var user = AuthFactory.getUser();

    vm.user = {
      name: user,
    };

    vm.logout = function() {
      // remove users credentials and redirect user
      AuthFactory.setUser();
      TokenFactory.setToken();
      $state.go('login');


      $rootScope.loggedIn = false;
    };

  }

  HeaderController.$inject = ['AuthFactory', 'TokenFactory', '$state', '$rootScope'];

})();
