angular
  .module('nautilusApp')
  .controller('HomeController', HomeController);


  function HomeController() {
    var vm = this;

    console.log('the Home controller, it does nothing');

    this.fromCtrl = 'hello from home controller';
  }
