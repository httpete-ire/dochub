'use strict';

/*@ngInject*/
function RegisterController(AuthService, $state, alertService) {
  var vm = this;

  vm.user = {};

  vm.btnText = 'Register';
  vm.submitted = false;
  vm.submitting = false;

  vm.register = function(obj, form) {
    vm.submitted = true;

    if(form.$invalid) {
      return false;
    }

    vm.submitting = true;

    AuthService.register(obj)
    .then(function() {
      $state.go('login');
    }).catch(function(err) {

      var errMessage = '';

      if(err.response.status === 409) {
        errMessage = err.response.message.email.value + ' is already taken, try another email';
      } else {
        errMessage = err.response.message[0].msg;
      }

      alertService.setAlert({
        message: errMessage,
        type: 'danger'
      });

      vm.user = {};
      vm.submitted = false;
      vm.submitting = false;
      vm.btnText = 'Register';
      form.$setPristine();


    });
  };

}

module.exports = RegisterController;
