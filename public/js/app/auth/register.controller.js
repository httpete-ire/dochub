(function() {
  'use strict';

  angular.module('docd')
  .controller('RegisterController', RegisterController);

  function RegisterController(AuthService, $state) {
    var vm = this;

    vm.user = {};

    console.log('working');

    vm.register = function(obj) {
      console.log(obj);

      return AuthService.register(obj).then(function() {
        $state.go('login');
      }).catch();
    };

  }

  RegisterController.$inject = ['AuthService', '$state'];

})();
