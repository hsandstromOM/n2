angular
  .module('nautilusApp')
  .controller('CustomHomesController', CustomHomesController);

  function CustomHomesController() {
    var vm = this;

    console.log('the custom homes controller, it does nothing');

    this.fromCtrl = 'hello from custom homes controller';
  }
