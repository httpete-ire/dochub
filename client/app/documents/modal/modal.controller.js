'use strict';

/*@ngInject*/
function DocumentModalController($uibModalInstance, document, submit, title, alertService) {
  var vm = this;
  vm.submitted = false;

  vm.close = function() {
    $uibModalInstance.close(false);
  };

  if(document) {
    vm.document = document;
  }

  vm.title = title;

  vm.submit = function(obj, form) {

    vm.submitted = true;

    if(form && form.$invalid) {
      return false;
    }

    submit(obj)
    .then(function() {
      $uibModalInstance.close(true);
    })
    .catch(function(err) {
      alertService.setAlert({
        message: err.response.message
      });

      vm.submitted = false;
      form.$setPristine();
    });

  };

}

module.exports = DocumentModalController;
