angular
  .module('nautilusApp')
  .controller('AboutController', AboutController);


  function AboutController(AboutService) {
    var vm = this;

    AboutService.getTeamMembers().then(function(teamMembers) {
      console.log(teamMembers.data.items);
      window.glob = teamMembers.data.items;
      vm.teamMembers = teamMembers.data.items;
    });

    console.log('the  Aboutcontroller, it does nothing');

    this.fromCtrl = 'hello from about ctrl'
  }
