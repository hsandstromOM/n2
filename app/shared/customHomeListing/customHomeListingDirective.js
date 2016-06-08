angular
  .module('nautilusApp')
  .directive('customHomeListing', CustomHomeListing);

  function CustomHomeListing() {
    var directive = {
      templateUrl: 'app/shared/customHomeListing/customHomeListingView.html',
      restrict: 'EA',
      replace: true,
      scope: {
        number: '@',
        name: '@',
        subtitle: '@',
        image: '@',
        selectHome: '&'
      },
      link:link,
      // controller: CustomHomesController,
      // controllerAs: 'vm',
      // bindToController: true
    };

    return directive;

    function link(scope, element, attributes, controller) {
      element.on('click', function(event) {
        console.log(scope);
        console.log(scope.$parent.$parent.customHomes.selectHome);
        console.log(attributes.number);
        scope.$parent.$parent.customHomes.selectHome(attributes.number);
        scope.$apply();
      });
    }
  }
