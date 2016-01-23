(function() {
  'use strict';

  angular.module('docd')
  .factory('parser', parser);

  function parser($window) {

    var _parser = new $window.DocdParser();

    return {
      render: function(md) {
        return _parser.render(md);
      }
    };

  }

  parser.$inject = ['$window'];

})();
