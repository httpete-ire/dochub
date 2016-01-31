'use strict';

/*@ngInject*/
function MergeController(pullRequest, $stateParams, pullRequestService, $$debounce, $timeout, $state, parser) {
  var vm = this;
  vm.pr = pullRequest;

  vm.state = {
    merge: false
  };

  vm.editorOptions = {
    value: vm.pr.content.markdown,
    orig: vm.pr.pullrequest.content.markdown,
    lineWrapping : true,
    lineNumbers: true,
    drag: false,
    onLoad: codemirrorLoaded,
    readOnly: true
  };

  vm.closeRequest = function() {
    pullRequestService.closePullRequest($stateParams.docid, $stateParams.chapterid)
    .then(handleResponse);
  };

  function handleResponse() {
    $state.go('chapters', {
      docid: $stateParams.docid
    });
  }

  //
  // EDITOR SETTINGS
  //
  function codemirrorLoaded(_editor) {

    var leftEditor = _editor.edit.doc;

    leftEditor.on('change', onChange);

    vm.mergeRequest = function() {
      var md = leftEditor.getValue();
      var html = parser.render(md);

      pullRequestService.mergePullRequest($stateParams.docid, $stateParams.chapterid, {
        markdown: md,
        html: html
      })
      .then(handleResponse);
    };

    function onChange() {

      // wrap the function in a timeout to force a
      // digest cycle within angular
      $timeout(function() {
        vm.state.merge = true;
        leftEditor.off('change', onChange);
      }, 0);

    }

  }

}

module.exports = MergeController;
