angular
  .module('nautilusApp')
  .controller('HomeController', HomeController);


  function HomeController(MainService) {
    var vm = this;

    MainService
      .setCurrentState('HOME');

    MainService
      .getPageContent('navbar')
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
