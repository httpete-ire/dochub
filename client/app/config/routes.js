'use strict';

/*@ngInject*/
function routeConfig($urlRouterProvider, $stateProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/documents');

  $stateProvider
    .state('documents', {
      url: '/documents',
      template: require('./../documents/documents.html'),
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
      template: require('./../editor/editor.html'),
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
      template: require('./../editor/editor.html'),
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
      template: require('./../login/login.html'),
      controller: 'LoginController',
      controllerAs: 'vm',
      auth: false
    })
    .state('register', {
      url: '/register',
      template: require('./../register/register.html'),
      controller: 'RegisterController',
      controllerAs: 'regCtrl',
      auth: false
    })
    .state('password', {
      url: '/reset-password',
      template: require('./../password/password.html'),
      controller: 'PasswordController',
      controllerAs: 'passwordCtrl',
      auth: false
    })
    .state('merge', {
      url: '/documents/:docid/chapters/:chapterid/merge',
      template: require('./../merge/merge.html'),
      controller: 'MergeController',
      controllerAs: 'mergeCtrl',
      auth: true,
      resolve: {
        pullRequest: ['pullRequestService', '$stateParams', function(pullRequestService, $stateParams) {
          return pullRequestService.getPullRequest($stateParams.docid, $stateParams.chapterid);
        }]
      }
    })
    .state('pull-request', {
      url: '/documents/:docid/chapters/:chapterid/pullrequest',
      template: require('./../pullrequest/pullrequest.html'),
      controller: 'PullrequestController',
      controllerAs: 'prCtrl',
      auth: false,
      resolve: {
        chapter: ['chapterService', '$stateParams', function(chapterService, $stateParams) {
          return chapterService.getChapter($stateParams.docid, $stateParams.chapterid);
        }]
      }
    })
    .state('chapters', {
      url: '/documents/:docid',
      template: require('./../chapters/chapters.html'),
      controller: 'ChaptersController',
      controllerAs: 'chapCtrl',
      auth: true,
      resolve: {
        chapters: ['chapterService', '$stateParams', function(chapterService, $stateParams) {
          return chapterService.getChapters($stateParams.docid);
        }]
      }
    })
    .state('versions', {
      url: '/documents/:docid/chapters/:chapterid/versions/:versionid',
      template: require('./../versions/versions.html'),
      controller: 'VerionController',
      controllerAs: 'versionCtrl',
      resolve: {
        data: ['versionService', '$stateParams', function(versionService, $stateParams) {
          return versionService.getVersion($stateParams.docid, $stateParams.chapterid, $stateParams.versionid);
        }]
      },
      auth: true
    });

  $httpProvider.interceptors.push('TokenInterceptor');

}

module.exports = routeConfig;
