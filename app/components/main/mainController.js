angular
  .module('nautilusApp')
  .controller('MainController', MainController);


  function MainController(MainService, NewsService, $http) {
    var vm = this;
    // const MAILCHIMP_USER = "nautilusco";
    // const MAILCHIMP_DC = "us2";
    // const MAILCHIMP_U = "91fe70fad31765c3ac6ebfa04";
    // const MAILCHIMP_ID = "762b7f2fea";
    const MAILCHIMP_KEY = '1029176b8a172367513eab75bfd1d6b0-us2';

    const MAILCHIMP_URL = "https://us2.api.mailchimp.com/3.0/lists/762b7f2fea/members"
    vm.getPageTitle = function() {
      return MainService.getPageTitle();
    };

    vm.getCurrentState = function() {
      return MainService.getCurrentState();
    };

    vm.signUp = function() {
      console.log("DOIN IT");
      var req = {
        "email_address": vm.signUpEmail,
        "status": "pending",
        // "merge_fields": {
        //   "FNAME": "Urist",
        //   "LNAME": "McVankab"
      };

      $http.post(MAILCHIMP_URL, req)
        .then(
          function(response){
            console.log("success" + response);
          },
          function(response){
            console.log("err" + response);
          }
        );
    };
  }
