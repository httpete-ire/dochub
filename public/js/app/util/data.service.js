(function() {
  'use strict';

  angular.module('docd')
  .factory('dataService', dataService);

  function dataService($http,  $q) {
    var service = {};

    var getDeleteMethods = ['get', 'delete'];
    var postPutMethods = ['post', 'put'];

    angular.forEach(getDeleteMethods, function(method) {
      service[method] = function(url) {
        var defer = $q.defer();

        $http[method](url)
          .success(function(data) {
            defer.resolve(data);
          })
          .error(function(err, status) {
            defer.reject(err);
          });

        return defer.promise;
      };
    });

    angular.forEach(postPutMethods, function(method) {
      service[method] = function(url, obj) {
        var defer = $q.defer();

        $http[method](url, obj)
          .success(function(data) {
            defer.resolve(data);
          })
          .error(function(err, status) {
            defer.reject(err);
          });

        return defer.promise;
      };
    });

    return service;
  }

})();
