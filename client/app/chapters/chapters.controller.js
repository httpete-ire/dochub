'use strict';

/*@ngInject*/
function ChaptersController(chapters, $stateParams, chapterService, TokenFactory) {
  var vm = this;

  vm.docid = $stateParams.docid;
  vm.token = TokenFactory.getToken();

  console.log(vm.token);

  vm.state = {
    toggle: false,
    sorted: false
  };

  vm.chapters = chapters;

  vm.toggleSort = function() {

    if(vm.state.sorted) {
      vm.state.sorted = false;

      var ids = [];

      angular.forEach(vm.chapters, function(chapter) {
        ids.push(chapter._id);
      });

      chapterService
      .updateChapters({
        docid: vm.docid,
        chapters: ids
      })
      .then(function(data) {
        console.log(data);
      })
      .catch(function(err) {
        console.log(err);
      });
    }

  };

  vm.dragControlListeners = {
    orderChanged: function() {
      // set the state to sorted
      vm.state.sorted = true;
    }
  };

}

module.exports = ChaptersController;
