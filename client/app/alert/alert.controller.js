'use strict';

/*@ngInject*/
function AlertController(alertService) {

  // expose alert service to view
  this.alertService = alertService;

  this.closeAlert = function() {
      alertService.hide();
  };


}

module.exports = AlertController;
