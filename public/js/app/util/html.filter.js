(function() {

  'use strict';

  angular.module('docd')
  .filter('html', filterHtml);

  function filterHtml($sce) {
    return $sce.trustAsHtml;
  }

  filterHtml.$inject = ['$sce'];

})();
