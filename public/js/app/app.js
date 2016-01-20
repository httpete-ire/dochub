(function() {

  'use strict';

  angular.module('docd', [
    'ui.router',
    'ui.bootstrap',
    'ui.ace'
  ])
  .config(routeConfig)
  .run(appRun);

  function routeConfig($urlRouterProvider, $stateProvider, $httpProvider) {

    $stateProvider
    .state('documents', {
      url: '/documents',
      templateUrl: 'templates/documents.html',
      controller: 'DocumentsController',
      controllerAs: 'docCtrl',
      auth: true,
      resolve: {
        docs: function(dataService) {
          return dataService.get('/api/v1/docs');
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController',
      controllerAs: 'vm',
      auth: false
    })
    .state('chapters', {
      url: '/documents/:docid',
      templateUrl: 'templates/chapters.html'
    });

    $httpProvider.interceptors.push('TokenInterceptor');
  }

  routeConfig.$inject = ['$urlRouterProvider', '$stateProvider', '$httpProvider'];

  function appRun($rootScope, TokenFactory, $state) {

    logged();

    $rootScope.$on('$stateChangeStart', function(e, toState) {

      $rootScope.stateIsLoading = true;

      if(toState.auth && !TokenFactory.isSet()) {
        e.preventDefault();
        $rootScope.loggedIn = false;
        $state.go('login');
      }

    });

    $rootScope.$on('$stateChangeSuccess', function (event, nextRoute, currentRoute){
      $rootScope.stateIsLoading = false;
      logged();
    });

    function logged() {
      $rootScope.loggedIn = TokenFactory.isSet();
    }

  }

  appRun.$inject = ['$rootScope', 'TokenFactory', '$state'];

})();
