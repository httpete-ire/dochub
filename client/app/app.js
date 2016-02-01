var angular = require('angular');

// dependencies
require('expose?diff_match_patch!diff-match-patch');
require('expose?CodeMirror!codemirror');
require('codemirror/addon/merge/merge.js');
require('angular-relative-date');
require('angular-ui-codemirror');
require('angular-modal-service');
require('angular-ui-router');
require('angular-ui-bootstrap');

// expose these for codemirror merge
window.DIFF_DELETE = -1;
window.DIFF_INSERT = 1;
window.DIFF_EQUAL = 0;

// require('angular-ui-bootstrap/src/modal/modal');
// require('angular-ui-bootstrap/src/stackedMap/stackedMap');

var app = angular.module('dochub', [
  'ui.router',
  'ui.bootstrap',
  'ui.codemirror',
  'relativeDate',
  'angularModalService'
])
.config(require('./config/routes'))
.run(require('./config/run'));

// app files
require('./auth')(app);
require('./login')(app);
require('./register')(app);
require('./util')(app);
require('./documents')(app);
require('./chapters')(app);
require('./editor')(app);
require('./merge')(app);
require('./header')(app);
require('./versions')(app);
require('./directives')(app);
require('./pullrequest')(app);
