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

    AboutService
      .getTeamMembers()
      .then(

        // Success handler
        function(teamMembers){
          vm.featuredTeamMember = {};
          vm.teamMembers = [];

          teamMembers.forEach(function(teamMember) {
            if (teamMember.fields.featured) {
              vm.featuredTeamMember = teamMember;
            } else {
              vm.teamMembers.push(teamMember);
            }
          });
        },

        // Error handler
        function(response){
          console.log('Oops, error ' + response.status);
        }
      );
  }
