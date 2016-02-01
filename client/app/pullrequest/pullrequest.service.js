'use strict';

  /*@ngInject*/
  function pullRequestService(dataService, API_PATH) {

    return {
      getPullRequest: getPullRequest,
      closePullRequest: closePullRequest,
      mergePullRequest: mergePullRequest,
      createPullrequest: createPullrequest
    };

    function createPullrequest(docid, chapterid, obj) {
      return dataService.post(API_PATH + 'docs/' + docid + '/chapters/' + chapterid + '/pullrequest', obj);
    }

    function mergePullRequest(docid, chapterid, obj) {
      return dataService.put(API_PATH + 'docs/' + docid + '/chapters/' + chapterid + '/pullrequest', obj);
    }

    function getPullRequest(docid, chapterid) {
      return dataService.get(API_PATH + 'docs/' + docid + '/chapters/' + chapterid + '?fields=chapters.content.markdown,chapters.pullrequest.message,chapters.pullrequest.content.markdown');
    }

    function closePullRequest(docid, chapterid) {
      return dataService.delete(API_PATH + 'docs/' + docid + '/chapters/' + chapterid + '/pullrequest');
    }

  }

  module.exports = pullRequestService;
