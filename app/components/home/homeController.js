angular
  .module('nautilusApp')
  .controller('HomeController', HomeController);


  function HomeController() {
    var vm = this;

    this.fromCtrl = 'hello from home controller';
  }
