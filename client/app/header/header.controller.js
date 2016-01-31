'use strict';

/*ngInject*/
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

module.exports = HeaderController;
