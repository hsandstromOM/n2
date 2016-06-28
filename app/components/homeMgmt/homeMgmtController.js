angular
  .module('nautilusApp')
  .controller('HomeMgmtController', HomeMgmtController);

  function HomeMgmtController(HomeMgmtService, MainService) {
    var vm = this;

    MainService
      .getPageContent('homeManagementPage')
      .then(

        // Success handler
        function(mainContent){
          console.log(mainContent);
          MainService.setPageTitle(mainContent.pageTitle);
        },

        // Error handler
        function(response){
          console.log('Oops, error ' + response.status);
        }
      );

    HomeMgmtService.getMainContent().then(function(mainContent) {
      // TO BE EDITED AFTER CLIENT ADDS CONTENT_URL
      // SOME FIELDS MIGHT REQUIRE FURTHER PROCESSING
      vm.bannerImage = mainContent.data.items;
      vm.bannerImageDescription = mainContent.data.items;
      vm.homeManagementHeadline = mainContent.data.items;
      vm.homeManagementDescription = mainContent.data.items;
      vm.homeManagementQuote = mainContent.data.items;
      vm.homeManagementQuoteAuthor = mainContent.data.items;
    });


    // HomeMgmtService.getHomeMgmtPortfolio().then(function(homeMgmtPortfolio) {
    //   // TO BE EDITED AFTER CLIENT ADDS CONTENT
    //   // MIGHT HAVE TO PROCESS HOMES BEFORE ASSIGNMENT
    //
    //   vm.homeMgmtPortfolio = homeMgmtPortfolio.data.items;
    // });

    vm.homeMgmtPortfolio = HomeMgmtService.getDummyPortfolio();

    console.log(vm.homeMgmtPortfolio);
  }
