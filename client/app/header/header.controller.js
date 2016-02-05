'use strict';

/*@ngInject*/
function HeaderController(AuthFactory, TokenFactory, $state, $rootScope) {
  var vm = this;
  var user = AuthFactory.getUser();

  console.log('working');

  vm.user = {
    name: user,
  };

  $rootScope.$on('login', function() {
    vm.user.name = AuthFactory.getUser();
  });

  vm.logout = function() {
    // remove users credentials and redirect user
    AuthFactory.setUser();
    TokenFactory.setToken();
    $state.go('login');
    vm.user.name = '';


    $rootScope.loggedIn = false;
  };

}

module.exports = HeaderController;
