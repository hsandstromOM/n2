angular
  .module('nautilusApp')
  .controller('CareersController', CareersController);

  function CareersController(CareersService) {
    var vm = this;

    CareersService.getCareerListings().then(function(careerListings) {
      console.log("careerListings: " + careerListings.data.items);
      window.careers = careerListings.data.items;
      vm.careerListings = careerListings.data.items;
    });
  }
