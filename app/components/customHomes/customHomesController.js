angular
  .module('nautilusApp')
  .controller('CustomHomesController', CustomHomesController);

  function CustomHomesController($scope, $stateParams, contentful, CustomHomesService) {
    var vm = this;
    if ($stateParams.customHomeID) {
      console.log("customHomesPage: " + $stateParams.customHomeID);
      vm.customHomeID = $stateParams.customHomeID;
      // Get all entries
    contentful
      .entries('sys.id=' + $stateParams.customHomeID)
      .then(

        // Success handler
        function(response){
          vm.customHome = response.data.items[0];
          console.log(vm.customHome);
        },

        // Error handler
        function(response){
          console.log('Oops, error ' + response.status);
        }
      );
    }
    // console.log($stateParams);
    CustomHomesService.getMainContent().then(function(mainContent) {
      // TO BE EDITED AFTER CLIENT ADDS CONTENT_URL
      // SOME FIELDS MIGHT REQUIRE FURTHER PROCESSING
      vm.bannerImage = mainContent.data.items;
      vm.bannerImageDescription = mainContent.data.items;
      vm.ourWorkDescription = mainContent.data.items;
      vm.ourWorkQuote = mainContent.data.items;
      vm.ourWorkQuoteAuthor = mainContent.data.items;
    });

    CustomHomesService.getCustomHomes().then(function(customHomes) {
      // TO BE EDITED AFTER CLIENT ADDS CONTENT
      // MIGHT HAVE TO PROCESS HOMES BEFORE ASSIGNMENT

      vm.customHomes = customHomes.data.items;
    });

    vm.customHomes = CustomHomesService.getDummyHomes();
    vm.selectedHome = CustomHomesService.getSelectedDummyHome(0);

    vm.selectHome = selectHome;
    vm.fromCtrl = 'hi';
    console.log('the custom homes controller');

    function selectHome(listingId) {
       vm.selectedHome = CustomHomesService.getSelectedDummyHome(listingId);
       console.log("you selected: " + vm.selectedHome);
       window.glob = vm.selectedHome;
       window.vm.home = vm.selectedHome;
       console.log("glob" + window.glob.number);
       console.log("vm" + window.vm.home.number);
    }
    window.vm = vm;

  }
