(function() {

  'use strict';

  var defaultSort = 'title';

  angular.module('docd')
  .controller('EditorController', EditorController);

  function EditorController($$debounce, chapterService, $stateParams, chapter) {

    var vm = this;

    vm.state = {
      preview: true
    };

    if(!chapter) {

      vm.state.new = true;

      vm.chapter = {
        title: '',
        markdown: '',
        html: ''
      };

    } else {

      vm.state.new = false;

      vm.chapter = {
        id: chapter._id,
        title: chapter.title,
        markdown: chapter.content.markdown,
        html: chapter.content.html
      };

    }

    var parser = new window.DocdParser();

    vm.action = function(obj) {
      obj.docid = $stateParams.docid;

      if(vm.state.new) {
        chapterService.newChapter(obj)
        .then(function(data) {
          vm.state.new = false;
          vm.chapter.id = data.id;
        })
        .catch(function(e) {
          console.error(e);
        });
      } else {
        chapterService.updateChapter(obj)
        .then(function(data) {
          console.log(data);
        })
        .catch(function(e) {
          console.error(e);
        });
      }

    };

    vm.actionText = function() {
      return (vm.state.new) ? 'Save chapter' : 'Update chapter';
    };

    //
    // ACE EDITOR SETUP
    //
    vm.aceLoaded = function(_editor) {
      var _session = _editor.getSession();

      if(!vm.state.new) {
        _session.getDocument().setValue(vm.chapter.markdown);
      }

      _editor.setOption('showPrintMargin', false);

      // create a debounced function that compiles and sets the markdown
      var compile = $$debounce(function() {
        vm.chapter.markdown = _session.getDocument().getValue();
        vm.chapter.html = parser.render(vm.chapter.markdown);
      }, 500);

      // when the editor changes
      _session.on('change', compile);

      // set toggle when ace editor loaded
      vm.togglePreview = function() {

        // when preview is reopened compile markdown for changes made when preview closed
        if(vm.state.preview) {
          vm.chapter.html = parser.render(_session.getDocument().getValue());
          _session.on('change', compile);
        } else {
          _session.off('change', compile);
        }

      };

    };
    //
    // ACE EDITOR SETUP
    //

  }

  EditorController.$injext = ['$$debounce', 'chapterService', 'chapter'];

})();
