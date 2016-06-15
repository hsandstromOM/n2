var markdown = require('markdown').markdown;

angular
  .module('nautilusApp')
  .controller('AboutController', AboutController);


  function AboutController(AboutService) {
    var vm = this;

    AboutService.getMainContent().then(function(teamMembers) {
      // TO BE EDITED AFTER CLIENT ADDS CONTENT_URL
      // SOME FIELDS MIGHT REQUIRE FURTHER PROCESSING
      vm.bannerImage = teamMembers.data.items;
      vm.bannerImageDescription = teamMembers.data.items;
      vm.ourStoryDescription = teamMembers.data.items;
      vm.ourStoryImage = teamMembers.data.items;
      vm.ourStoryQuote = teamMembers.data.items;
    });

    AboutService.getTeamMembers().then(function(teamMembers) {
      // console.log("team members: " + teamMembers.data.items);
      window.team = teamMembers.data.items;
      vm.teamMembers = teamMembers.data.items;

      // console.log("images: " + teamMembers.data.includes.Asset);
      // window.images = teamMembers.data.includes.Asset;
      var imageArr = teamMembers.data.includes.Asset;

      var imageId;

      angular.forEach(vm.teamMembers, function(teamMember) {

        teamMember.fields.teamMemberFirstName = teamMember.fields.teamMemberName.split(' ')[0];

        // teamMember.fields.teamMemberBioPointsParsed = teamMember.fields.teamMemberBioPoints.replace(/- /g, '').split('\n');
        teamMember.fields.teamMemberBioPointsHTML = markdown.toHTML(teamMember.fields.teamMemberBioPoints);

        imageId = teamMember.fields.teamMemberImage.sys.id;

        angular.forEach(imageArr, function (image) {
          if (image.sys.id == imageId) {
            teamMember.fields.teamMemberImageUrl = image.fields.file.url;
          }
        });
      });
    });

    AboutService.getCoreValues().then(function (coreValues) {
      vm.coreValues =coreValues.data.items;
    });
  }
