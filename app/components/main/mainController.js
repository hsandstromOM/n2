angular
  .module('nautilusApp')
  .controller('MainController', MainController);


  function MainController(MainService, NewsService, $rootScope) {
    var vm = this;

    vm.getPageTitle = function() {
      return MainService.getPageTitle();
    };

    vm.getCurrentState = function() {
      return MainService.getCurrentState();
    };

    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
      if (to.name == "news" && from.name !== "newsDetail") {
        console.log('clear localStore');
      }
    });
  }
