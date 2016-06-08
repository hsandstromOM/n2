angular
  .module('nautilusApp')
  .controller('CustomHomesController', CustomHomesController);

  function CustomHomesController(CustomHomesService) {
    var vm = this;

    vm.customHomes = CustomHomesService.getCustomHomes();
    vm.selectedHome = 0;

    vm.selectHome = selectHome;

    console.log('the custom homes controller');

    function selectHome(listingId) {
       vm.selectedHome = listingId;
       window.glob = vm.selectedHome;
    }
  }
