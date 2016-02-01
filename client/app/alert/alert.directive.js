'use strict';

/*@ngInject*/
function dochubAlert() {
  return {
    bindToController: true,
    controller: 'AlertController as appAlert',
    template: '<uib-alert ng-if="appAlert.alertService.show" type="{{ appAlert.alertService.type }}" >{{ appAlert.alertService.message }}</uib-alert>'
  };
}

module.exports = dochubAlert;
