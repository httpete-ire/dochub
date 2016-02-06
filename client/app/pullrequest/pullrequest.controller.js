'use strict';

/**@ngInject*/
function PullrequestController($$debounce, pullRequestService, $stateParams, chapter, parser) {

  var vm = this;

  vm.state = {
    preview: true,
    submitted: false
  };

  vm.chapter = {
    id: chapter._id,
    markdown: chapter.content.markdown,
    html: chapter.content.html
  };

  vm.editorOptions = {
    lineWrapping : true,
    lineNumbers: true,
    allowDropFileTypes: ['text/markdown'],
    onLoad: codemirrorLoaded
  };

  vm.pull = function(pr, form) {

    vm.state.submitted = true;

    console.log(pr);

    if(form.$invalid || !vm.chapter.markdown) {
      return false;
    }

    pullRequestService.createPullrequest($stateParams.docid, $stateParams.chapterid, pr)
    .then(function(data) {

      vm.state.submitted = false;

      // pull request made
      // show something to user
    }).catch();

  };

  //
  // ACE EDITOR SETUP
  //
  function codemirrorLoaded(_editor) {

    var _doc = _editor.getDoc();

    var compile = $$debounce(function() {
      vm.chapter.markdown = _editor.getValue();
      vm.chapter.html = parser.render(vm.chapter.markdown);
    }, 500);

    _editor.setValue(vm.chapter.markdown);

    _editor.on('change', compile);

    vm.togglePreview = function() {

      if(vm.state.preview) {
        vm.chapter.html = parser.render(_editor.getValue());
        _editor.on('change', compile);
      } else {
        _editor.off('change', compile);
      }

    };

  }

}

module.exports = PullrequestController;
