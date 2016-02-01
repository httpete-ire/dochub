'use strict';

module.exports = function(module) {

  module
  .controller('AlertController', require('./alert.controller.js'))
  .factory('alertService', require('./alert.service.js'))
  .directive('dochubAlert', require('./alert.directive.js'));

};
