angular
  .module('nautilusApp')
  .controller('AboutController', AboutController);


  function AboutController(AboutService) {
    var vm = this;

    AboutService.getTeamMembers().then(function(teamMembers) {

      console.log("team members: " + teamMembers.data.items);
      window.team = teamMembers.data.items;
      vm.teamMembers = teamMembers.data.items;

      console.log("images: " + teamMembers.data.includes.Asset);
      window.images = teamMembers.data.includes.Asset;
      var imageArr = teamMembers.data.includes.Asset;

      var imageId;

      angular.forEach(vm.teamMembers, function(teamMember) {
        console.log("team member: " + teamMember.fields.teamMemberName);

        imageId = teamMember.fields.teamMemberImage.sys.id;
        console.log("team member image id: " + imageId);

         angular.forEach(imageArr, function (image) {
          if (image.sys.id == imageId) {
            teamMember.fields.teamMemberImageUrl = image.fields.file.url;
          }
        });
      });
    });

    console.log('the  Aboutcontroller, it does nothing');

    this.fromCtrl = 'hello from about ctrl';
  }
