angular
  .module('nautilusApp')
  .controller('ContactController', ContactController);

  function ContactController() {
    var vm = this;

    console.log('the contact controller, it does nothing');

    this.fromCtrl = 'hello from contact controller';
  }
