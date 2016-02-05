'use strict';

/*@ngInject*/
function ChaptersController(chapters, $stateParams, chapterService, TokenFactory, $uibModal) {
  var vm = this;

  vm.docid = $stateParams.docid;
  vm.token = TokenFactory.getToken();

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

  vm.delete = function(id) {
    var modal = $uibModal.open({
      template: require('./modal/chapter.modal.html'),
      controller: require('./../documents/modal/modal.controller.js'),
      controllerAs: 'modalCtrl',
      size: 'sm',
      resolve: {
        document: function() {
          return {
            docid: vm.docid,
            chapterid: id
          };
        },
        submit: ['chapterService', function(chapterService) {
          return chapterService.deleteChpater;
        }],
        title: function() {
          return 'Delete chapter';
        }
      }
    });

    modal.result.then(function(update) {
      chapterService
      .getChapters(vm.docid)
      .then(function(data) {
        vm.chapters = data;
      });
    });

  };

  vm.dragControlListeners = {
    orderChanged: function() {
      vm.state.sorted = true;
    }
  };

}

module.exports = ChaptersController;
