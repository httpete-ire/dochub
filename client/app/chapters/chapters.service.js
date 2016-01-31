'use strict';

/*@ngInject*/
function chapterService(dataService, API_PATH) {

  return {
    getChapters: getChapters,
    newChapter: newChapter,
    getChapter: getChapter,
    updateChapter: updateChapter,
    updateChapters: updateChapters
  };

  function updateChapters(obj) {
    return dataService.put(API_PATH + 'docs/' + obj.docid + '/chapters/', obj);
  }

  function updateChapter(obj) {
    return dataService.put(API_PATH + 'docs/' + obj.docid + '/chapters/' + obj.id, obj);
  }

  function getChapter(docid, chapterid) {
    return dataService.get(API_PATH + 'docs/' + docid + '/chapters/' + chapterid);
  }

  function newChapter(obj) {
    return dataService.post(API_PATH + 'docs/' + obj.docid + '/chapters', obj);
  }

  function getChapters(id) {
    return dataService.get(API_PATH + 'docs/' + id + '/chapters');
  }

}

  module.exports = chapterService;
