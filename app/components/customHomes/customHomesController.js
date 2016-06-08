angular
  .module('nautilusApp')
  .controller('CustomHomesController', CustomHomesController);

  function CustomHomesController(CustomHomesService) {
    var vm = this;

    console.log('the custom homes controller');

    this.customHomes = CustomHomesService.getCustomHomes();
    console.log(this.customHomes);
  }
