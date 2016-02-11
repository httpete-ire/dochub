'use strict';

/*@ngInject*/
function VerionController(data, $timeout, parser, chapterService, $stateParams, $state) {
  var vm = this;
  vm.data = data;
  vm.docid = $stateParams.docid;

  vm.state = {
    changes: false,
    submitted: false
  };

  vm.editorOptions = {
    value: data.chapter.markdown,
    orig: data.version.markdown,
    lineWrapping : true,
    lineNumbers: true,
    drag: false,
    onLoad: codemirrorLoaded,
    readOnly: true
  };


  function codemirrorLoaded(_editor) {

    var leftEditor = _editor.edit.doc;

    vm.updateChapter = function() {
      vm.state.submitted = true;

      var md = leftEditor.getValue();
      var html = parser.render(md);

      chapterService.updateChapter({
        docid: $stateParams.docid,
        id: vm.data.chapter._id,
        title: vm.data.chapter.title,
        markdown: md,
        html: html
      })
      .then(function(data) {
        vm.state.submitted = false;
        $state.go('chapters', {
          docid: $stateParams.docid
        });
      })
      .catch(function(e) {
        vm.state.submitted = false;
        console.error(e);
      });

    };


    leftEditor.on('change', onChange);
    function onChange() {
      // wrap the function in a timeout to force a
      // digest cycle within angular
      $timeout(function() {
        vm.state.changes = true;
        leftEditor.off('change', onChange);
      }, 0);
    }

  }

}

module.exports = VerionController;
