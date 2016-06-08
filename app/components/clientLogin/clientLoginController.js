angular
  .module('nautilusApp')
  .controller('ClientLoginController', ClientLoginController);

  function ClientLoginController() {
    var vm = this;

    console.log('the ClientLogin controller, it does nothing');

    this.fromCtrl = 'hello from client login controller';
  }
