angular
  .module('nautilusApp')
  .controller('CustomHomesController', CustomHomesController);

  function CustomHomesController(MainService, $scope, $stateParams, contentful, CustomHomesService, Lightbox) {
    var vm = this;

    MainService
      .setCurrentState('CUSTOM-HOMES');

    MainService
      .getPageContent('customHomesPage')
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

    if ($stateParams.customHomeID) {
      console.log("customHomesPage: " + $stateParams.customHomeID);
      vm.customHomeID = $stateParams.customHomeID;
      // Get all entries
    contentful
      .entries('sys.id=' + $stateParams.customHomeID)
      .then(

        // Success handler
        function(response){
          vm.customHome = response.data.items[0];

          vm.customHome.fields.customHomeGallery.forEach(function(image, idx) {
            image.index = idx;
          });

          MainService.setPageTitle(vm.customHome.fields.pageTitle);
          console.log(vm.customHome);
        },

        // Error handler
        function(response){
          console.log('Oops, error ' + response.status);
        }
      );
    }
    vm.selectPhoto = function(index) {
      vm.selectedProjectImage = vm.customHome.fields.customHomeGallery[index];
    };
    vm.nextPhoto = function(index){
      if(index === vm.customHome.fields.customHomeGallery.length - 1) {
        vm.selectPhoto(0);
      } else {
        vm.selectPhoto(++index);
      }
    };
    vm.prevPhoto = function(index){
      if(index === 0) {
        vm.selectPhoto(vm.customHome.fields.customHomeGallery.length - 1);
      } else {
        vm.selectPhoto(--index);
      }
    };
  }
