'use strict';

/*@ngInject*/
function alertService($timeout) {

  var service = {
    show: false,
    message: 'Some error',
    type: 'danger',
    time: 3500
  };

  service.hide = function() {
    service.show = false;
  };

  service.reset = function() {
    service.show = false;
    service.message = '';
  };

  service.setAlert = function(alert) {
    service.message = alert.message;
    service.type = alert.type || 'danger';
    service.show = true;

    $timeout(function() {
      console.log('working');
      service.hide();
    }, service.time);

  };

  return service;
}

module.exports=  alertService;
