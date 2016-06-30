angular
  .module('nautilusApp')
  .controller('AboutController', AboutController);

  function AboutController(AboutService, MainService) {
    var vm = this;

    MainService
      .setCurrentState('ABOUT');

    MainService
      .getPageContent('aboutUsPage')
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
