angular
  .module('nautilusApp')
  .controller('TestimonialsController', TestimonialsController);

  function TestimonialsController(MainService) {
    var vm = this;

    MainService
      .setCurrentState('');

    // MainService.setPageTitle('Nautilus Company | Testimonials');

    MainService
      .getPageContent('testimonialsPage')
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
