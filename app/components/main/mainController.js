angular
  .module('nautilusApp')
  .controller('MainController', MainController);


  function MainController(MainService) {
    var vm = this;

    vm.getPageTitle = function() {
      return MainService.getPageTitle();
    };
  }
