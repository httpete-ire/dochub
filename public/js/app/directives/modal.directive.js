(function() {
  'use strict';

  angular.module('docd')
  .directive('modal', modal);

  var MODAL_VIEWS = 'templates/modals/';

  function modal($modal) {
    return {
      transclude: true,
      restrict: 'EA',
      template: '<span ng-click="open()" ng-transclude></span>',
      scope: {
        size: '@',
        controller: '@',
        controllerAs: '@',
        template: '@',
        id: '@',
        action: '&',
        edit: '@'
      },
      link: link
    };

    function link(scope, elem, attrs) {

      // attach an open function that creates an instance of the modal
      scope.open = function() {
        $modal.open({
          controller: scope.controller,
          controllerAs: 'vm',
          windowClass: 'app-modal-window',
          templateUrl: MODAL_VIEWS + scope.template + '.html',
          backdrop: true,
          size: scope.size || 'lg',
          resolve: {
            modalProps: function() {
              return {
                id: scope.id || null,
                action: scope.action,
                edit: scope.edit
              };
            }
          }
        });
      };

    }

  }

  modal.$inject = ['$uibModal'];

})();
