(function() {

  'use strict';

  var defaultSort = 'Sort by';

  angular.module('docd')
  .controller('DocumentsController', DocumentsController);

  function DocumentsController() {
    var vm = this;
    this.sort = defaultSort;

    this.setSort = function(value) {

      if(!value) value = defaultSort;

      this.sort = value;
    };
  }

  DocumentsController.$injext = [];

})();
