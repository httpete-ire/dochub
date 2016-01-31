'use strict';

/*@ngInject*/
function RegisterController(AuthService, $state) {
  var vm = this;

  vm.user = {};

  vm.register = function(obj) {

    return AuthService.register(obj).then(function() {
      $state.go('login');
    }).catch();
  };

}

module.exports = RegisterController;
