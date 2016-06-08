angular
  .module('nautilusApp')
  .directive('customHomeListing', CustomHomeListing);

  function CustomHomeListing() {
    return {
      templateUrl: 'app/shared/customHomeListing/customHomeListingView.html',
      restrict: 'E',
      replace: true,
      scope: {
        number: '@',
        name: '@',
        subtitle: '@',
        image: '@',
      },
      link: function(scope, element, attributes) {
        element.on('click', function(event) {
          scope.$parent.$parent.submitted = true;
          scope.$parent.$parent.current = attributes;
          scope.$apply();
          element.children().html('');
        });

      }
    };
  }
