
'use strict';

var defaultSort = 'title';

/*@ngInject*/
function DocumentsController(docs, documentService, $uibModal) {
  var vm = this;

  this.sort = defaultSort;
  this.sortDisplay = 'Title';

  this.docs = docs;

  this.setSort = function(value, display) {
    this.sort = value;
    this.sortDisplay = display;
  };

  this.update = function() {
    documentService.getDocuments()
    .then(function(data) {
      vm.docs = data;
    });
  };

  this.newDocument = function() {
    var modal = $uibModal.open({
      template: require('./modal/modal.html'),
      controller: require('./modal/modal.controller.js'),
      controllerAs: 'modalCtrl',
      size: 'sm',
      resolve: {
        document: function() {
          return null;
        },
        submit: ['documentService', function(documentService) {
          return documentService.addDocument;
        }],
        title: function() {
          return 'New document';
        }
      }
    });

    modal.result.then(handleResponse);
  };

  this.editDocument = function(id) {

    var modal = $uibModal.open({
      template: require('./modal/modal.html'),
      controller: require('./modal/modal.controller.js'),
      controllerAs: 'modalCtrl',
      size: 'sm',
      resolve: {
        document: ['documentService', function(documentService) {
          return documentService.getDocument(id);
        }],
        submit: ['documentService', function(documentService) {
          return documentService.editDocument;
        }],
        title: function() {
          return 'Edit document';
        }
      }
    });

    modal.result.then(handleResponse);
  };

  this.deleteDocument = function(_id) {
    var modal = $uibModal.open({
      template: require('./modal/delete/modal.html'),
      controller: require('./modal/modal.controller.js'),
      controllerAs: 'modalCtrl',
      size: 'sm',
      resolve: {
        document: function() {
          return _id;
        },
        submit: ['documentService', function(documentService) {
          return documentService.deleteDocument;
        }],
        title: function() {
          return 'Are you sure you want to delete this document';
        }
      }
    });

    modal.result.then(handleResponse);
  };


  this.publish = function(doc) {
    documentService.editDocument(doc).then(function() {
      console.log('working');
    });
  };

  function handleResponse(update) {
    if(update) {
      vm.update();
    }
  }

}

module.exports = DocumentsController;
