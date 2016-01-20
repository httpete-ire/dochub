(function() {

  'use strict';

  var defaultSort = 'title';

  angular.module('docd')
  .controller('DocumentsController', DocumentsController);

  function DocumentsController(docs, documentService) {
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

  }

  DocumentsController.$injext = ['docs', 'documentService'];

})();
