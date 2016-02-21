'use strict';

/*@ngInject*/
function appRun($rootScope, TokenFactory, $state) {

  logged();

  $rootScope.$on('$stateChangeStart', function(e, toState) {

    $rootScope.stateIsLoading = true;

    if(toState.auth && !TokenFactory.isSet()) {
      e.preventDefault();
      $rootScope.loggedIn = false;
      $rootScope.stateIsLoading = false;
      $state.go('login');
    } else if(TokenFactory.isSet() && (toState.name === 'login' || toState.name === 'register' || toState.name === 'password' || toState.name === 'reset')) {
      $state.go('documents');
    }

  });

  $rootScope.$on('$stateChangeSuccess', function (event, nextRoute, currentRoute){
    $rootScope.stateIsLoading = false;
    logged();
  });

  $rootScope.$on('$stateChangeError', function (event, nextRoute, currentRoute){
    console.log('error');
  });

  function logged() {
    $rootScope.loggedIn = TokenFactory.isSet();
  }

}

module.exports = appRun;
