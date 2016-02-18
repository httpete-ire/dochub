'use strict';

var DocdParser = require('docd-parser');

/*@ngInject*/
function parser($window) {

  var _parser = new DocdParser();

  return {
    render: function(md) {
      return _parser.render(md);
    }
  };

}

module.exports = parser;
