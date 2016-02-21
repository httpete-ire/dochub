
'use strict';

/*@ngInject*/
function ResetController($stateParams, AuthService, alertService, $timeout, $state) {
  var vm = this;
  
  vm.state = {
    submitted: false,
    submitting: false
  };

  vm.reset = function(password, form) {
    vm.state.submitted = true;

    if(form.$invalid) {
      return false;
    }

    vm.state.submitting = true;

    AuthService.resetPassword($stateParams.token, password)
    .then(function() {
      alertService.setAlert({
        message: 'password succesfully changed, redirecting to login page',
        type: 'success'
      });

      vm.password = '';

      $timeout(function() {
        $state.go('login');
      }, alertService.time);

      vm.state.submitting = false;
    })
    .catch(function(err) {
      alertService.setAlert({
        message: err.response.message,
        type: 'danger'
      });

      vm.password = '';

      vm.state.submitted = false;
      vm.state.submitting = false;
    });

  };

}

module.exports = ResetController;
