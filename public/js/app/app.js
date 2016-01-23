(function() {

  'use strict';

  angular.module('docd', [
    'ui.router',
    'ui.bootstrap',
    'ui.codemirror',
    'as.sortable'
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
        docs: ['documentService', function(documentService) {
          return documentService.getDocuments();
        }]
      }
    })
    .state('editor', {
      url: '/documents/:docid/editor',
      templateUrl: 'templates/editor.html',
      controller: 'EditorController',
      controllerAs: 'editorCtrl',
      auth: true,
      resolve: {
        chapter: function() {
          return null;
        }
      }
    })
    .state('edit-chapter', {
      url: '/documents/:docid/chapters/:chapterid',
      templateUrl: 'templates/editor.html',
      controller: 'EditorController',
      controllerAs: 'editorCtrl',
      auth: false,
      resolve: {
        chapter: ['chapterService', '$stateParams', function(chapterService, $stateParams) {
          return chapterService.getChapter($stateParams.docid, $stateParams.chapterid);
        }]
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController',
      controllerAs: 'vm',
      auth: false
    })
    .state('pull-request', {
      url: '/documents/:docid/chapters/:chapterid/pull-request',
      templateUrl: 'templates/pull-request.html',
      controller: 'PullRequestController',
      controllerAs: 'prCtrl',
      auth: true,
      resolve: {
        pullRequest: ['pullRequestService', '$stateParams', function(pullRequestService, $stateParams) {
          return pullRequestService.getPullRequest($stateParams.docid, $stateParams.chapterid);
        }]
      }
    })
    .state('chapters', {
      url: '/documents/:docid',
      templateUrl: 'templates/chapters.html',
      controller: 'ChaptersController',
      controllerAs: 'chapCtrl',
      auth: true,
      resolve: {
        chapters: ['chapterService', '$stateParams', function(chapterService, $stateParams) {
          return chapterService.getChapters($stateParams.docid);
        }]
      }
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
        $rootScope.stateIsLoading = false;
        $state.go('login');
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

  appRun.$inject = ['$rootScope', 'TokenFactory', '$state'];

})();
