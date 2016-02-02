'use strict';

module.exports = function(module) {

  module
  .constant('API_PATH', 'http://api.dochub.co:4000/')
  .factory('dataService', require('./data.service.js'))
  .filter('html', require('./html.filter.js'))
  .factory('parser', require('./parser.factory.js'));

};
