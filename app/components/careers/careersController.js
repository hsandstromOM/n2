angular
  .module('nautilusApp')
  .controller('CareersController', CareersController);

  function CareersController(CareersService, MainService) {
    var vm = this;

    MainService
      .setCurrentState('');

    MainService
      .getPageContent('careersPage')
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
  }
