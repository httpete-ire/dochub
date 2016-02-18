'use strict';

/**@ngInject*/
function PullrequestController($$debounce, pullRequestService, $stateParams, chapter, parser, $timeout) {

  var vm = this;

  vm.state = {
    preview: true,
    submitted: false,
    requestMade: false,
    error: null,
    submitting: false
  };

  vm.stateParams = $stateParams;

  vm.chapter = {
    id: chapter._id,
    markdown: chapter.content.markdown,
    html: parser.render(chapter.content.markdown),
    pullrequest: {
      set: chapter.pullrequest.set
    }
  };

  vm.editorOptions = {
    lineWrapping : true,
    lineNumbers: true,
    allowDropFileTypes: ['text/markdown'],
    onLoad: codemirrorLoaded
  };

  vm.pull = function(pr, form) {

    vm.state.submitted = true;

    if(form.$invalid || !vm.chapter.markdown) {
      return false;
    }

    vm.state.submitting = true;

    pullRequestService
    .createPullrequest($stateParams.docid, $stateParams.chapterid, pr)
    .then(function(data) {

      vm.state.requestMade = true;
      vm.state.submitted = false;
      vm.state.submitting = false;

      // pull request made
      // show something to user
    }).catch(function(err) {
      vm.state.submitted = false;
      vm.state.submitting = false;

      if(err.response.status === 409) {
        vm.state.requestMade = true;
        vm.state.error = err.response.message;
      }


    });

  };


  //
  // ACE EDITOR SETUP
  //
  function codemirrorLoaded(_editor) {

    // expose editor to controller
    vm.editor = _editor;

    var previewWindow = document.querySelector('.editor__preview-body');

    var compile = $$debounce(function() {
      vm.chapter.markdown = _editor.getValue();
      vm.chapter.html = parser.render(vm.chapter.markdown);
    }, 500);

    _editor.setValue(vm.chapter.markdown);

    _editor.on('change', compile);

    _editor.on('scroll', function(e) {
      previewWindow.scrollTop = e.doc.scrollTop;
    });

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
