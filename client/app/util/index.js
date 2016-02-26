'use strict';

module.exports = function(module) {

  module
  // .constant('API_PATH', 'https://api.dochub.co/')
  .constant('API_PATH', 'http://api.dochub.co:4000/')
  // .contant('DOC_PATH', 'https://docs.dochub.co/')
  .constant('DOC_PATH', 'http://docs.dochub.co:4000/')
  .factory('dataService', require('./data.service.js'))
  .filter('relativeDate', require('./date.filter.js'))
  .filter('html', require('./html.filter.js'))
  .factory('parser', require('./parser.factory.js'));

};
