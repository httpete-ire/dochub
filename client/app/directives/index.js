'use strict';

module.exports = function(module) {

  module
  .directive('toggle', require('./toggle.directive.js'))
  .directive('controlSave', require('./control-save.directive.js'));

};
