'use strict';

/**
 * @ngInject
 */
function ctrlSave($window, $$debounce) {
  return {
    restrict: 'A',
    scope: {
      save: '&'
    },
    link: function(scope, elem, attr) {

      var save = function(e) {

        if((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
          e.preventDefault();
          scope.save();
        }
      };

      angular.element($window).on('keydown', save);

      elem.on('$destroy', function(e) {
          angular.element($window).off('keydown', save);
      });

    }
  };
}

module.exports = ctrlSave;
