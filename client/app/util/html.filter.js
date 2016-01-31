'use strict';

/*@ngInject*/
function filterHtml($sce) {
  return $sce.trustAsHtml;
}

module.exports = filterHtml;
