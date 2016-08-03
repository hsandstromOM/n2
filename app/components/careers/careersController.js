angular
  .module('nautilusApp')
  .controller('CareersController', CareersController);

  function CareersController(CareersService, MainService, contentful) {
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

    contentful
      .entries('content_type=career')
      .then(

        // Success handler
        function(response){
          console.log(response);
          vm.careers = response.data.items;
          angular.forEach(vm.careers, function(career) {
            var d = new Date(career.fields.date);
            career.fields.day = d.getDate();
            career.fields.month = getMonthName(d.getMonth());
            career.fields.year = d.getFullYear();
            console.log(career);
          })
        },

        // Error handler
        function(response){
          console.log('Oops, error ' + response.status);
        }
      );

      function getMonthName(monthNum) {
        switch(monthNum) {
          case 0: return 'January';
          case 1: return 'February';
          case 2: return 'March';
          case 3: return 'April';
          case 4: return 'May';
          case 5: return 'June';
          case 6: return 'July';
          case 7: return 'August';
          case 8: return 'September';
          case 9: return 'October';
          case 10: return 'November';
          case 11: return 'December';
        }
      }

    vm.toggleListing = function(careerId) {
      vm.currentListing = vm.currentListing === careerId ? '' : careerId;
    };
  }
