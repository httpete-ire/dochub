
'use strict';

/*@ngInject*/
function LoginController(AuthService, TokenFactory, AuthFactory, $state, alertService, $rootScope) {
  var vm = this;
  vm.submitted = false;
  vm.submitting = false;
  vm.loginText = 'Login';

  vm.login = function(email, password, form) {

    vm.submitted = true;

    if(form.$invalid) {
      return false;
    }

    vm.submitting = true;
    vm.loginText = 'Logging in...';

    AuthService.login({
      email: email,
      password: password
    })
    .then(function(data) {
      AuthFactory.setUser(data.user.name);
      TokenFactory.setToken(data.token);
      $rootScope.$emit('login');
      $state.go('documents');
    })
    .catch(function(err) {

      var errMessage = (angular.isArray(err.response.message)) ? err.response.message[0].msg : err.response.message;

      alertService.setAlert({
        message: errMessage,
        type: 'danger'
      });

      // reset form
      vm.submitted = false;
      vm.loginText = 'Login';
      vm.email = '';
      vm.password = '';
      vm.submitting = false;
      form.$setPristine();

    });

  };

}

module.exports = LoginController;
