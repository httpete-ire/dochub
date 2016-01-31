var angular = require('angular');

require('expose?CodeMirror!codemirror');
require('angular-relative-date');
require('angular-ui-codemirror');
require('angular-modal-service');

// require('angular-ui-bootstrap/src/modal/modal');
// require('angular-ui-bootstrap/src/stackedMap/stackedMap');

var app = angular.module('dochub', [
  // 'ui.router'
  require('angular-ui-router'),
  require('angular-ui-bootstrap'),
  'ui.codemirror',
  'relativeDate',
  'angularModalService'
])
.config(require('./config/routes'))
.run(require('./config/run'));

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
