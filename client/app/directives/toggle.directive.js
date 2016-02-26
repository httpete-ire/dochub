'use strict';

/*@ngInject*/
function toggle() {

  return {
    restrict: 'E',
    scope: {
      toggleModel: '=',
      change: '&'
    },
    template: [
      '<div class="toggle__container">',
        '<div class="toggle">',
          '<input type="checkbox" class="toggle__checkbox" ng-model="toggleModel" ng-click="change()" tabindex="-1">',
          '<b class="toggle__switch"></b>',
          '<b class="toggle__track"></b>',
        '</div>',
      '</div>'
    ].join('')
  };

}

module.exports = toggle;
