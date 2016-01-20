(function() {

  'use strict';

  angular.module('docd')
  .controller('DocumentModalController', DocumentModalController);

  function DocumentModalController(modalProps, $uibModalInstance, documentService) {
    var vm = this;

    vm.props = modalProps;


    if(modalProps.id && modalProps.edit) {

      vm.title = 'Edit document';

      documentService
      .getDocument(modalProps.id)
      .then(function(data) {
        vm.document = data[0];
      });

    } else {

      vm.title = 'New document';

      vm.document = {
        title: '',
        desc: ''
      };

    }

    vm.delete = function(id) {
      documentService
      .deleteDocument(id)
      .then(handleResponse);
    };

    vm.submit = function(model) {
      if(modalProps.id) {
        documentService
        .editDocument(model)
        .then(handleResponse);
      } else {
        documentService
        .addDocument(model)
        .then(handleResponse);
      }
    };

    vm.close = function() {
      $uibModalInstance.close();
    };

    // handle response of all promises within controller
    function handleResponse() {
      $uibModalInstance.close();
      modalProps.action();
    }

  }

  DocumentModalController.$injext = ['modalProps', '$uibModalInstance', 'documentService'];

})();
