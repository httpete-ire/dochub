'use strict';

module.exports = function(module) {

  module
  .constant('API_PATH', 'http://localhost:4000/api/v1/')
  .factory('dataService', require('./data.service.js'))
  .filter('html', require('./html.filter.js'))
  .factory('parser', require('./parser.factory.js'));

};
