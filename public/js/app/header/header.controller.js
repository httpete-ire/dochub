(function() {

  'use strict';

  angular.module('docd')
  .controller('HeaderController', HeaderController);

  function HeaderController() {
    var vm = this;

    vm.user = {
      name: 'Pete',
      img: 'https://pbs.twimg.com/profile_images/591601666920701953/oTI-Or1l.jpg'
    };

  }

})();
