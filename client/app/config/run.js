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
      e.preventDefault();
      $state.go('documents');
    }

  });

  $rootScope.$on('$stateChangeSuccess', function (event, nextRoute, currentRoute){
    $rootScope.stateIsLoading = false;
    logged();
  });

  $rootScope.$on('$stateChangeError', function (event, nextRoute, currentRoute, fromState, fromParams, error){

    console.log(error.response);

    if(error.response.status === 404) {
      $state.go('404');
    }

  });

  function logged() {
    $rootScope.loggedIn = TokenFactory.isSet();
  }

}

module.exports = appRun;
