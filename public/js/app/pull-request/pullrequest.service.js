(function() {

  'use strict';

  angular.module('docd')
  .factory('pullRequestService', pullRequestService);


  function pullRequestService(dataService, API_PATH) {

    return {
      getPullRequest: getPullRequest,
      closePullRequest: closePullRequest,
      mergePullRequest: mergePullRequest,
      createPullrequest: createPullrequest
    };

    function createPullrequest(docid, chapterid, obj) {
      return dataService.post('docs/' + docid + '/chapters/' + chapterid + '/pullrequest', obj);
    }

    function mergePullRequest(docid, chapterid, obj) {
      return dataService.put('docs/' + docid + '/chapters/' + chapterid + '/pullrequest', obj);
    }

    function getPullRequest(docid, chapterid) {
      return dataService.get('docs/' + docid + '/chapters/' + chapterid + '?fields=chapters.content.markdown,chapters.pullrequest.message,chapters.pullrequest.content.markdown');
    }

    function closePullRequest(docid, chapterid) {
      return dataService.delete('docs/' + docid + '/chapters/' + chapterid + '/pullrequest');
    }

  }

  pullRequestService.$inject = ['dataService', 'API_PATH'];

})();
