(function() {

  'use strict';

  var defaultSort = 'title';

  angular.module('docd')
  .controller('EditorController', EditorController);

  function EditorController($$debounce, $sce, chapterService, $stateParams) {
    var vm = this;

    vm.state = {
      preview: true
    };

    vm.html = '';

    vm.chapter = {
      title: '',
      markdown: '',
      html: ''
    };

    var parser = new window.DocdParser();

    vm.save = function(obj) {

      console.log(obj);

      obj.id = $stateParams.docid;

      chapterService.newChapter(obj)
      .then(function(data) {
        console.log(data);
      })
      .catch(function(e) {
        console.error(e);
      });

    };

    vm.aceLoaded = function(_editor) {

      var _session = _editor.getSession();

      _editor.setOption('showPrintMargin', false);

      var compile = $$debounce(function() {
        vm.chapter.markdown = _session.getDocument().getValue();
        vm.chapter.html = parser.render(vm.chapter.markdown);
        vm.html = $sce.trustAsHtml(vm.chapter.html);
      }, 500);
      _session.on('change', compile);

      // set toggle when ace editor loaded
      vm.togglePreview = function() {

        if(vm.state.preview) {
          vm.html = $sce.trustAsHtml(parser.render(_session.getDocument().getValue()));
          _session.on('change', compile);
        } else {
          _session.off('change', compile);
        }

      };

    };

  }

  EditorController.$injext = ['$$debounce', '$sce', 'chapterService'];

})();
