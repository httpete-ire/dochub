
'use strict';

/*@ngInject*/
function PasswordController(AuthService, alertService) {
  var vm = this;
  vm.submitted = false;
  vm.btnText = 'Reset password';

  vm.resetPassword = function(email, form) {
    vm.submitted = true;
    vm.btnText = 'Resetting password';

    console.log(email);

    AuthService
    .resetPassword(email)
    .then(function() {
      alertService.setAlert({
        message: 'Please check your email for a reset link',
        type: 'success'
      });
      vm.email = '';
    })
    .catch(function(err) {
      alertService.setAlert({
        message: err.response.message,
        type: 'danger'
      });
      vm.email = '';
    });

  };

}

module.exports = PasswordController;
