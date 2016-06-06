angular
  .module('nautilusApp')
  .controller('NewsController', NewsController);

  function NewsController($scope) {
    var vm = this;

    console.log('the News controller, it does nothing');

    this.fromCtrl = 'hello from news ctrl';
  }
