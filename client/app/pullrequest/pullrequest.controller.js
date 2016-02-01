'use strict';

/**@ngInject*/
function PullrequestController($$debounce, pullRequestService, $stateParams, chapter, parser) {

  var vm = this;

  vm.state = {
    preview: true
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

  vm.pull = function() {

    pullRequestService.createPullrequest($stateParams.docid, $stateParams.chapterid, {
      message: 'test',
      markdown: vm.chapter.markdown,
      html: vm.chapter.html
    }).then(function(data) {
      console.log(data);
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
