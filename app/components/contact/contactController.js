angular
  .module('nautilusApp')
  .controller('ContactController', ContactController);

  function ContactController(ContactService, MainService, $rootScope) {
    var vm = this;

    vm.contactSubject = '';

    MainService
      .setCurrentState('CONTACT');

    MainService
      .getPageContent('contactUsPage')
      .then(

        // Success handler
        function(mainContent){
          console.log(mainContent);
          MainService.setPageTitle(mainContent.pageTitle);
        },

        // Error handler
        function(response){
          console.log('Oops, error ' + response.status);
        }
      );

      vm.submitForm = function() {
        if(vm.subscribe) {
          vm.mailchimp = {};
          var splitName = vm.contactName.split(' ');
          vm.mailchimp.FNAME = splitName[0];
          vm.mailchimp.LNAME = splitName[1] ? splitName[1] : '';
          vm.mailchimp.EMAIL = vm.contactEmail;
          addSubscription(vm.mailchimp);
        }
      };

      /**
      * angular-mailchimp
      * http://github.com/keithio/angular-mailchimp
      * License: MIT
      */
      addSubscription = function() {
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
          },

          // Error sending data to MailChimp
          function (error) {
            $log.error('MailChimp Error: %o', error);
          }
        );
      };
  }
