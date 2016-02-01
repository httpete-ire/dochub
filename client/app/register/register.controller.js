'use strict';

/*@ngInject*/
function RegisterController(AuthService, $state, alertService) {
  var vm = this;

  vm.user = {};

  vm.btnText = 'Register';
  vm.submitted = false;

  vm.register = function(obj, form) {
    vm.submitted = true;

    AuthService.register(obj)
    .then(function() {
      $state.go('login');
    }).catch(function(err) {

      var message = err.response.message.email.value + ' is already taken, try another email';

      alertService.setAlert({
        message: message,
        type: 'danger'
      });

      vm.user = {};
      vm.submitted = false;
      vm.btnText = 'Register';
      form.$setValidity();
      form.$setPristine();
      form.$setUntouched();

    });
  };

}

module.exports = RegisterController;
