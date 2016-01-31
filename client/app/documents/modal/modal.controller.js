'use strict';

/*@ngInject*/
function DocumentModalController($uibModalInstance, document, submit, title) {
  var vm = this;

  vm.close = function() {
    $uibModalInstance.close(false);
  };

  if(document) {
    vm.document = document;
  }

  vm.title = title;

  vm.submit = function(obj) {
    submit(obj).then(function() {
      $uibModalInstance.close(true);
    });
  };

}

module.exports = DocumentModalController;
