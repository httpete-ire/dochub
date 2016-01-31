(function() {

  'use strict';

  angular.module('docd')
  .factory('versionService', versionService);


  function versionService(dataService, API_PATH) {

    return {
      getVersion: getVersion
    };

    function getVersion(docid, chapterid, versionid) {
      return dataService.get('docs/' + docid + '/chapters/' + chapterid + '/versions/' + versionid);
    }

  }

  versionService.$inject = ['dataService', 'API_PATH'];

})();
