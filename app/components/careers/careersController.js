angular
  .module('nautilusApp')
  .controller('CareersController', CareersController);

  function CareersController() {
    var vm = this;

    console.log('the careers controller, it does nothing');

    this.fromCtrl = 'hello from careers controller';
  }
