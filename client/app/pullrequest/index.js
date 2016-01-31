'use strict';

module.exports = function(module) {

  module
  .controller('PullrequestController', require('./pullrequest.controller.js'))
  .factory('pullRequestService', require('./pullrequest.service.js'));

};
