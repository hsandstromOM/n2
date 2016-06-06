angular
  .module('nautilusApp')
  .controller('HomeMgmtController', HomeMgmtController);

  function HomeMgmtController() {
    var vm = this;

    console.log('the HomeMgmt controller, it does nothing');

    this.fromCtrl = 'hello from homemgmt ctrl'
  }
