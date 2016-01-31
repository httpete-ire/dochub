(function() {

  'use strict';

  var defaultSort = 'title';

  angular.module('docd')
  .controller('EditorController', EditorController);

  function EditorController($$debounce, chapterService, $stateParams, chapter, dataService, parser) {

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

    vm.editorOptions = {
      lineWrapping : true,
      lineNumbers: true,
      allowDropFileTypes: ['text/markdown'],
      onLoad: codemirrorLoaded,
      // theme: 'material'
    };

    //
    // ACE EDITOR SETUP
    //
    function codemirrorLoaded(_editor) {

      var _doc = _editor.getDoc();
      var previewWindow = document.querySelector('.editor__preview-body');

      var compile = $$debounce(function() {
        vm.chapter.markdown = _editor.getValue();
        vm.chapter.html = parser.render(vm.chapter.markdown);
      }, 150);

      if(!vm.state.new) {
        _editor.setValue(vm.chapter.markdown);
      } else {
        _editor.setValue('');
      }

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
    //
    // ACE EDITOR SETUP
    //

  }

  EditorController.$injext = ['$$debounce', 'chapterService', 'chapter', 'parser'];

})();
