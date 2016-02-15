
'use strict';

var defaultSort = 'title';

/*@ngInject*/
function DocumentsController(docs, documentService, $uibModal, toastr, $window) {
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

    if(doc.chapters.length < 1) {
      doc.published = false;
      toastr.warning('A document must contain at least one chapter before you can publish it', 'Warning');
      return false;
    }

    documentService.editDocument(doc).then(function() {

      if(doc.published) {

          var link = 'https://docs.dochub.co/' + doc._id;


          toastr.success('click to open', 'Published: ' + link, {
            onTap: function() {
              $window.open('https://docs.dochub.co/' + doc._id);
            }
          });

      }

    });
  };

  function handleResponse(update) {
    if(update) {
      vm.update();
    }
  }

}

module.exports = DocumentsController;
