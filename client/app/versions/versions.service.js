'use strict';

/*@ngInject*/
function versionService(dataService, API_PATH) {

  return {
    getVersion: getVersion
  };

  function getVersion(docid, chapterid, versionid) {
    return dataService.get('docs/' + docid + '/chapters/' + chapterid + '/versions/' + versionid);
  }

}

module.exports = versionService;
