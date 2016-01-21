(function() {

  'use strict';

  angular.module('docd')
  .factory('chapterService', chapterService);


  function chapterService(dataService, API_PATH) {
    return {
      getChapters: getChapters
    };

    function getChapters(id) {
      return dataService.get(API_PATH + 'docs/' + id + '/chapters');
    }

  }

  chapterService.$injext = ['dataService', 'API_PATH'];

})();
