var markdown = require('markdown').markdown;

angular
  .module('nautilusApp')
  .controller('CareersController', CareersController);

  function CareersController(CareersService) {
    var vm = this;

    CareersService.getCareerListings().then(function(careerListings) {
      console.log("careerListings: " + careerListings.data.items);
      window.careers = careerListings.data.items;
      vm.careerListings = careerListings.data.items;

      angular.forEach(vm.careerListings, function(careerListing) {
        console.log("career listing: " + careerListing.fields.careerTitle);

        console.log("raw: " + careerListing.fields.careerDescription);
        console.log("converted: " + markdown.toHTML(careerListing.fields.careerDescription));
        careerListing.fields.careerDescriptionHTML = markdown.toHTML(careerListing.fields.careerDescription);

      });
    });
  }
