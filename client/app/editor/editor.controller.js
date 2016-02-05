'use strict';

var defaultSort = 'title';

/*@ngInject*/
function EditorController($$debounce, chapterService, $stateParams, chapter, dataService, parser) {

  var vm = this;

  vm.docid = $stateParams.docid;

  vm.state = {
    preview: true,
    submitted: false,
    titleConflictError: false
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

  vm.action = function(obj, form) {
    obj.docid = $stateParams.docid;

    vm.state.submitted = true;
    vm.state.titleConflictError = false;

    if(form.$invalid || !vm.chapter.markdown) {
      return false;
    }

    form.$setPristine();

    if(vm.state.new) {
      chapterService.newChapter(obj)
      .then(function(data) {
        vm.state.new = false;
        vm.chapter.id = data.id;
        vm.state.submitted = true;
      })
      .catch(handleErr);
    } else {
      chapterService.updateChapter(obj)
      .then(function(data) {
        vm.state.submitted = true;
      })
      .catch(handleErr);
    }

    function handleErr(err) {
      console.log(err);
      if(err.response.status === 409) {
        vm.state.titleConflictError = true;
      }
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
  // EDITOR SETUP
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

}

module.exports = EditorController;
