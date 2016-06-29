angular
  .module('nautilusApp')
  .controller('ContactController', ContactController);

  function ContactController(ContactService, MainService) {
    var vm = this;

    MainService
      .getPageContent('contactUsPage')
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

    ContactService.getMainContent().then(function(mainContent) {
      // TO BE EDITED AFTER CLIENT ADDS CONTENT
      // SOME FIELDS MIGHT REQUIRE FURTHER PROCESSING
      vm.bannerImage = mainContent.data.items;
      vm.bannerImageDescription = mainContent.data.items;
      vm.contactInformationTitle = mainContent.data.items;
      vm.contactAddress = mainContent.data.items;
      vm.contactCityStateZipCode = mainContent.data.items;
      vm.contactCounty = mainContent.data.items;
      vm.contactPhoneNumber = mainContent.data.items;
      vm.careersSectionTitle = mainContent.data.items;
      vm.careersSectionDescription = mainContent.data.items;
    });
  }
