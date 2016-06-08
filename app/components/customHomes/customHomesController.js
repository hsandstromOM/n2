angular
  .module('nautilusApp')
  .controller('CustomHomesController', CustomHomesController);

  function CustomHomesController($scope, CustomHomesService) {
    var vm = this;

    vm.customHomes = CustomHomesService.getCustomHomes();
    vm.selectedHome = CustomHomesService.getSelectedHome(0);

    vm.selectHome = selectHome;
    vm.fromCtrl = 'hi';
    console.log('the custom homes controller');

    function selectHome(listingId) {
       vm.selectedHome = CustomHomesService.getSelectedHome(listingId);
       console.log("you selected: " + vm.selectedHome);
       window.glob = vm.selectedHome;
       window.vm.home = vm.selectedHome;
       console.log("glob" + window.glob.number);
       console.log("vm" + window.vm.home.number);
    }
    window.vm = vm;

  }
