
'use strict';

/*@ngInject*/
function LoginController(AuthService, TokenFactory, AuthFactory, $state, $timeout, alertService, $rootScope) {
  var vm = this;
  vm.submitted = false;
  vm.loginText = 'Login';

  vm.login = function(email, password, form) {

    vm.submitted = true;
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

      alertService.setAlert({
        message: err.response.message,
        type: 'danger'
      });

      // reset form
      vm.submitted = false;
      vm.loginText = 'Login';
      vm.email = '';
      vm.password = '';
      form.$setValidity();
      form.$setPristine();
      form.$setUntouched();

    });

  };

}

module.exports = LoginController;
