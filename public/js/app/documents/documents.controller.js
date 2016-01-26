(function() {

  'use strict';

  var defaultSort = 'title';

  angular.module('docd')
  .controller('DocumentsController', DocumentsController);

  function DocumentsController(docs, documentService) {
    var vm = this;

    this.sort = defaultSort;
    this.sortDisplay = 'Title';

    console.log(docs);

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

    vm.publish = function(doc) {
      documentService.editDocument(doc).then(function() {
        console.log('working');
      });
    };

  }

  DocumentsController.$injext = ['docs', 'documentService'];

})();
