'use strict';

module.exports = function(module) {

  module
  .controller('ChaptersController', require('./chapters.controller.js'))
  .factory('chapterService', require('./chapters.service.js'));

};
