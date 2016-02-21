
'use strict';

/*@ngInject*/
function PasswordController(AuthService, alertService) {
  var vm = this;
  vm.submitted = false;
  vm.submitting = false;
  vm.btnText = 'Reset password';

  vm.resetPassword = function(email, form) {
    vm.submitted = true;

    if(form.$invalid) {
      return false;
    }

    vm.submitting = true;
    vm.btnText = 'Resetting password';

    AuthService
    .requestNewPassword(email)
    .then(function() {
      alertService.setAlert({
        message: 'Please check your email for a reset link',
        type: 'success'
      });
      vm.email = '';
    })
    .catch(function(err) {

      var errMessage = '';

      if(err.response.status === 404) {
        errMessage = 'no account found with that email';
      } else {
        errMessage = err.response.message[0].msg;
      }

      alertService.setAlert({
        message: errMessage,
        type: 'danger'
      });

      vm.submitted = false;
      vm.submitting = false;
      vm.email = '';
      form.$setPristine();
    });

  };

}

module.exports = PasswordController;
