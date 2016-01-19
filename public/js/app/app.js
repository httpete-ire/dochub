(function() {

  'use strict';

  angular.module('docd', [
    'ui.router',
    'ui.bootstrap',
    'ui.ace'
  ])
  .config(routeConfig);

  function routeConfig($stateProvider) {

    $stateProvider
    .state('documents', {
      url: '/documents',
      templateUrl: 'templates/documents.html',
      controller: 'DocumentsController',
      controllerAs: 'docCtrl'
    })
    .state('chapters', {
      url: '/documents/:docid',
      templateUrl: 'templates/chapters.html'
    });

  }

  routeConfig.$inject = ['$stateProvider'];

})();
