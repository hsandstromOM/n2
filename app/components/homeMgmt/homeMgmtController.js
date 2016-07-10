angular
  .module('nautilusApp')
  .controller('HomeMgmtController', HomeMgmtController);

  function HomeMgmtController(HomeMgmtService, contentful, MainService) {
    var vm = this;

    MainService
      .setCurrentState('HOME-MGMT');

    contentful
      .entries('content_type=homeManagementPage')
      .then(

        // Success handler
        function(response){
          console.log(response);
          MainService.setPageTitle(response.data.items[0].fields.pageTitle);
          vm.projectGallery = response.data.items[0].fields.projectGallery;
          vm.projectGallery.forEach(function(image, idx) {
            image.index = idx;
          });
        },

        // Error handler
        function(response){
          console.log('Oops, error ' + response.status);
        }
      );

      vm.selectPhoto = function(index) {
        console.log(vm.projectGallery);
        vm.selectedProject = vm.projectGallery[index];
      };

      vm.nextPhoto = function(index){
        if(index === vm.projectGallery.length - 1) {
          vm.selectPhoto(0);
        } else {
          vm.selectPhoto(++index);
        }
      };

      vm.prevPhoto = function(index){
        if(index === 0) {
          vm.selectPhoto(vm.projectGallery.length - 1);
        } else {
          vm.selectPhoto(--index);
        }
      };
  }
