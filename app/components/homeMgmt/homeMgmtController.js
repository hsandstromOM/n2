angular
  .module('nautilusApp')
  .controller('HomeMgmtController', HomeMgmtController);

  function HomeMgmtController(HomeMgmtService) {
    var vm = this;

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


    HomeMgmtService.getHomeMgmtPortfolio().then(function(homeMgmtPortfolio) {
      // TO BE EDITED AFTER CLIENT ADDS CONTENT
      // MIGHT HAVE TO PROCESS HOMES BEFORE ASSIGNMENT

      vm.homeMgmtPortfolio = homeMgmtPortfolio.data.items;
    });

    vm.homeMgmtPortfolio = HomeMgmtService.getDummyPortfolio();

    console.log('the HomeMgmt controller, it does nothing');
  }
