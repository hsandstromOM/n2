angular
  .module('nautilusApp')
  .controller('CustomHomesDetailController', CustomHomesDetailController);

  function CustomHomesDetailController() {
    var vm = this;

    console.log('the CustomHomesDetail controller, it does nothing');

    this.fromCtrl = 'hello from customHomesDetail ctrl';
  }
