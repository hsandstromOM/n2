angular
  .module('nautilusApp')
  .controller('ContactController', ContactController);

  function ContactController(ContactService, MainService, $rootScope) {
    var vm = this;

    vm.form = {};
    vm.form.subject = '';

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
        console.log("form data: " + vm.form);
        window.form = vm.form;
        var message = {
          fromEmail: vm.form.email,
          fromName: vm.form.name,
          subject: vm.form.subject,
          comments: vm.form.comments,
        };
        switch (vm.form.subject) {
          case "Custom Home Construction":
            message.toEmail = "custom@nautilusco.com";
            message.toName = "Custom Homes";
            break;
          case "Home Management":
            message.toEmail = "mgmt@nautilusco.com";
            message.toName = "Home Management";
            break;
          case "Careers":
            message.toEmail = "careers@nautilusco.com";
            message.toName = "Careers";
            break;
          default:
            message.toEmail = "mike@launchpeer.com";
            message.toName = "Other, etc";
        }

        ContactService.sendEmail(message).then(function(data) {
          if(data[0].status === 'sent') {
            vm.thisErrorMessage += ' The email was sent.';
          } else {
            vm.thisErrorMessage += ' This eamil was not sent to the dev team for an unknown reason. Oops.';
          }
        });

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
