angular
    .module('nautilusApp')
    .controller('ContactController', ContactController);

function ContactController(ContactService, MainService, contentful, $rootScope, $state) {
    var vm = this;
    vm.form = {};
    vm.form.subject = '';
    vm.subscribe = true;

    MainService
        .setCurrentState('CONTACT');

    MainService
        .getPageContent('contactUsPage')
        .then(

            // Success handler
            function(mainContent) {
                console.log(mainContent);
                MainService.setPageTitle(mainContent.pageTitle);
            },

            // Error handler
            function(response) {
                console.log('Oops, error ' + response.status);
            }
        );

    contentful
        .entries('content_type=contactFormSubject&order=fields.orderNumber')
        .then(function(res) {
            console.log("form subjects: " + res.data.items);
            vm.formSubjects = res.data.items;
        });



    vm.submitForm = function() {
        console.log("form data: " + vm.form);
        ///SETUP FOR THANK YOU MESSAGE
        // var myForm = angular.element(document.querySelector('.form-control'))
        // $scope.myForm.setUntouched()
        var myEl = angular.element(document.querySelector('.contactFormDiv'));
        myEl.addClass('hidden');
        var myElToShow = angular.element(document.querySelector('.thankYouDiv'));
        myElToShow.removeClass('hidden');

        window.setTimeout(function() {
          // myElToShow.addClass('hidden');
          // myEl.removeClass('hidden')
           $state.reload();
        }, 3000);


        window.form = vm.form;
        var message = {
            fromEmail: vm.form.email,
            fromName: vm.form.name,
            subject: vm.form.subject,
            comments: vm.form.comments,
        };
        switch (vm.form.subject) {
            case vm.formSubjects[0].fields.title:
                message.toEmail = vm.formSubjects[0].fields.recipientEmail;
                message.toName = vm.formSubjects[0].fields.recipientName;
                break;
            case vm.formSubjects[1].fields.title:
                message.toEmail = vm.formSubjects[1].fields.recipientEmail;
                message.toName = vm.formSubjects[1].fields.recipientName;
                break;
            case vm.formSubjects[2].fields.title:
                message.toEmail = vm.formSubjects[2].fields.recipientEmail;
                message.toName = vm.formSubjects[2].fields.recipientName;
                break;
            default:
                message.toEmail = vm.formSubjects[3].fields.recipientEmail;
                message.toName = vm.formSubjects[3].fields.recipientName;
        }

        ContactService.sendEmail(message).then(function(data) {
            if (data[0].status === 'sent') {
                vm.thisErrorMessage += ' The email was sent.';
            } else {
                vm.thisErrorMessage += ' This eamil was not sent to the dev team for an unknown reason. Oops.';
            }
        });

        if (vm.subscribe) {
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
            function(response) {
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
            function(error) {
                $log.error('MailChimp Error: %o', error);
            }
        );
    };
}
