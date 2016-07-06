angular
  .module('nautilusApp')
  .controller('ContactController', ContactController);

  function ContactController(ContactService, MainService) {
    var vm = this;

    vm.contactSubject = '';
    
    MainService
      .setCurrentState('CONTACT');

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
  }
