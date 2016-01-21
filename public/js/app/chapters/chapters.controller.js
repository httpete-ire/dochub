(function() {

  'use strict';

  angular.module('docd')
  .controller('ChaptersController', ChaptersController);

  function ChaptersController(chapters) {
    var vm = this;

    vm.state = {
      toggle: true,
      sorted: false
    };

    vm.chapters = chapters;

    vm.toggleSort = function() {

      if(vm.state.sorted) {
        vm.state.sorted = false;
        alert('sorted');
      }

    };

    vm.dragControlListeners = {
      orderChanged: function() {
        // set the state to sorted
        vm.state.sorted = true;
      }
    };

  }

  ChaptersController.$injext = ['chapters'];

})();
