'use strict';

module.exports = function(module) {

  module
  .controller('DocumentsController', require('./documents.controller.js'))
  .factory('documentService', require('./documents.service.js'));

};
