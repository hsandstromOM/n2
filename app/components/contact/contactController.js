angular
  .module('nautilusApp')
  .controller('ContactController', ContactController);

  function ContactController(ContactService) {
    var vm = this;

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
