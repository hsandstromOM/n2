var markdown = require('markdown').markdown;

angular
  .module('nautilusApp')
  .controller('CareersController', CareersController);

  function CareersController(CareersService) {
    var vm = this;

    CareersService.getMainContent().then(function(mainContent) {
      // TO BE EDITED AFTER CLIENT ADDS CONTENT
      // SOME FIELDS MIGHT REQUIRE FURTHER PROCESSING
      vm.bannerImage = mainContent.data.items;
      vm.bannerImageDescription = mainContent.data.items;
      vm.careersDescription = mainContent.data.items;
      vm.careersImage = mainContent.data.items;
      vm.careersQuote = mainContent.data.items;
    });

    CareersService.getCareerListings().then(function(careerListings) {
      console.log("careerListings: " + careerListings.data.items);
      window.careers = careerListings.data.items;
      vm.careerListings = careerListings.data.items;

      var convertedToHTML;
      var columnDivide;

      angular.forEach(vm.careerListings, function(careerListing) {
        console.log("career listing: " + careerListing.fields.careerTitle);

        console.log("raw: " + careerListing.fields.careerDescription);
        console.log("converted: " + markdown.toHTML(careerListing.fields.careerDescription));
        console.log("indexOf <h3>Resp: " + markdown.toHTML(careerListing.fields.careerDescription).indexOf('<h3>Responsibilities'));
        convertedToHTML = markdown.toHTML(careerListing.fields.careerDescription);
        columnDivide = convertedToHTML.indexOf('<h3>Responsibilities</h3>');
        endIndex = convertedToHTML.indexOf('<h2>Are you our next team member?</h2>');
        console.log("first col: " + convertedToHTML.slice(0, columnDivide));
        console.log("second col: " + convertedToHTML.slice(columnDivide, endIndex));

        // careerListing.fields.careerDescriptionHTML = markdown.toHTML(careerListing.fields.careerDescription);
        careerListing.fields.careerDescriptionFirstCol = convertedToHTML.slice(0, columnDivide);
        careerListing.fields.careerDescriptionSecondCol = convertedToHTML.slice(columnDivide, endIndex);

      });
    });
  }
