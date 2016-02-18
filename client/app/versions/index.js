'use strict';

module.exports = function(module) {

  module
  .controller('VerionController', require('./versions.controller.js'))
  .factory('versionService', require('./versions.service.js'));

};
