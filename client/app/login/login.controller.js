
'use strict';

/*@ngInject*/
function LoginController(AuthService, TokenFactory, AuthFactory, $state) {
  var vm = this;

  vm.login = function(email, password) {
    AuthService.login({
      email: email,
      password: password
    })
    .then(function(data) {
      AuthFactory.setUser(data.user.name);
      TokenFactory.setToken(data.token);
      $state.go('documents');
    });
  };

}

module.exports = LoginController;
