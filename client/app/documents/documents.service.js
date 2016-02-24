'use strict';

/*@ngInject*/
function documentService(dataService, API_PATH, toastr, $window, DOC_PATH) {
  return {
    getDocuments: getDocuments,
    getDocument: getDocument,
    addDocument: addDocument,
    editDocument: editDocument,
    deleteDocument: deleteDocument,
    publishDocument: publishDocument
  };

  function deleteDocument(_id) {
      return dataService.delete(API_PATH + 'docs/' + _id +'?fields=title,desc');
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
    return dataService.get(API_PATH + 'docs/' + id +'?fields=title,desc,published');
  }

  function publishDocument(doc) {

    if(doc.chapters.length < 1) {
      doc.published = false;
      toastr.warning('A document must contain at least one chapter before it can be published', 'Warning');
      return false;
    }

    editDocument(doc).then(function() {

      if(doc.published) {

          var link = DOC_PATH + doc._id;
          toastr.success('click to open', 'Published: ' + link, {
            onTap: function() {
              $window.open(link);
            }
          });

      }

    });
  }

}

module.exports = documentService;
