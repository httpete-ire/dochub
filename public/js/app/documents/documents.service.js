(function() {

  'use strict';

  angular.module('docd')
  .factory('documentService', documentService);


  function documentService(dataService, API_PATH) {
    return {
      getDocuments: getDocuments,
      getDocument: getDocument,
      addDocument: addDocument,
      editDocument: editDocument,
      deleteDocument: deleteDocument
    };

    function deleteDocument(id) {
        return dataService.delete(API_PATH + 'docs/' + id +'?fields=title,desc');
    }

    function editDocument(model) {
      return dataService.put(API_PATH + 'docs/' + model._id, model);
    }

    function addDocument(model) {
      return dataService.post(API_PATH + 'docs', model);
    }

    function getDocuments() {
      return dataService.get(API_PATH + 'docs?fields=title,updated,published,chapters.title');
    }

    function getDocument(id) {
      return dataService.get(API_PATH + 'docs/' + id +'?fields=title,desc');
    }
  }

  documentService.$injext = ['dataService', 'API_PATH'];

})();
