angular
  .module('nautilusApp')
  .controller('HomeMgmtController', HomeMgmtController);

  function HomeMgmtController(HomeMgmtService) {
    var vm = this;

    vm.homeMgmtPortfolio = HomeMgmtService.getHomeMgmtPortfolio();

    console.log('the HomeMgmt controller, it does nothing');
  }
