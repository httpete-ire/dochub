'use strict';

/*@ngInject*/
function ChaptersController(chapterData, $stateParams, chapterService, TokenFactory, $uibModal, documentService) {
  var vm = this;

  vm.docid = $stateParams.docid;
  vm.token = TokenFactory.getToken();

  vm.doc = chapterData;

  vm.state = {
    toggle: false,
    sorted: false
  };

  vm.chapters = chapterData.chapters;

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
          return 'Are you sure you want to delete this chapter';
        }
      }
    });

    modal.result.then(function(update) {
      chapterService
      .getChapters(vm.docid)
      .then(function(data) {
        vm.chapters = data.chapters;
      });
    }).catch(function(){
      console.log('working');
    });

  };

  vm.dragControlListeners = {
    orderChanged: function() {
      vm.state.sorted = true;
    }
  };

  console.log(documentService);

  vm.publish = function(doc) {
    documentService.publishDocument(doc);
  };

}

module.exports = ChaptersController;
