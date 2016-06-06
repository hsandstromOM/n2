angular
  .module('nautilusApp')
  .controller('AboutController', AboutController);


  function AboutController() {
    var vm = this;

    console.log('the  Aboutcontroller, it does nothing');

    this.fromCtrl = 'hello from about ctrl'
  }
