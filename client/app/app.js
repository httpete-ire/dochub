require('expose?diff_match_patch!diff-match-patch');
require('expose?CodeMirror!codemirror');
require('codemirror/addon/merge/merge.js');
require('angular-ui-codemirror');
require('ng-sortable');
require('angular-toastr');

// expose these for codemirror merge
window.DIFF_DELETE = -1;
window.DIFF_INSERT = 1;
window.DIFF_EQUAL = 0;

var app = window.angular.module('dochub', [
  'ui.router',
  'ui.codemirror',
  'ngMessages',
  'as.sortable',
  'toastr',
  require('angular-ui-bootstrap/src/modal'),
  require('angular-ui-bootstrap/src/debounce'),
  require('angular-ui-bootstrap/src/alert'),
  require('angular-ui-bootstrap/src/dropdown')
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
require('./alert')(app);
require('./password')(app);
require('./reset')(app);
