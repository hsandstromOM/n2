angular
  .module('nautilusApp')
  .controller('MainController', MainController);


  function MainController(MainService, NewsService, $rootScope, $anchorScroll) {
    var vm = this;

    $rootScope.$on("$stateChangeSuccess", function (event, currentRoute, previousRoute) {
      $anchorScroll('pageTop');
    });

    // const MAILCHIMP_KEY = '1029176b8a172367513eab75bfd1d6b0-us2';

    vm.getPageTitle = function() {
      return MainService.getPageTitle();
    };

    vm.getCurrentState = function() {
      return MainService.getCurrentState();
    };

    /**
    * angular-mailchimp
    * http://github.com/keithio/angular-mailchimp
    * License: MIT
    */
    vm.addSubscription = function(formValid) {
      if(formValid) {
        // Create MailChimp resource
        MailChimpSubscription = MainService.mailchimpResource(vm.mailchimp);

        // Send subscriber data to MailChimp
        MailChimpSubscription.save(
          // Successfully sent data to MailChimp.
          function (response) {
            // Define message containers.
            vm.mailchimp.errorMessage = '';
            vm.mailchimp.successMessage = '';

            // Store the result from MailChimp
            vm.mailchimp.result = response.result;

            // Mailchimp returned an error.
            if (response.result === 'error') {
              if (response.msg) {
                // Remove error numbers, if any.
                var errorMessageParts = response.msg.split(' - ');
                if (errorMessageParts.length > 1)
                  errorMessageParts.shift(); // Remove the error number
                  vm.mailchimp.errorMessage = errorMessageParts.join(' ');
                } else {
                  vm.mailchimp.errorMessage = 'Sorry! An unknown error occured.';
                }
              }
              // MailChimp returns a success.
              else if (response.result === 'success') {
                vm.mailchimp.successMessage = response.msg;
              }

              //Broadcast the result for global msgs
              $rootScope.$broadcast('mailchimp-response', response.result, response.msg);
              vm.mailchimp.EMAIL = "Email address submitted.";
            },

            // Error sending data to MailChimp
            function (error) {
              $log.error('MailChimp Error: %o', error);
            }
          );
        }
    };
  }
