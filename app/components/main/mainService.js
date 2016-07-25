angular
  .module('nautilusApp')
  .service('MainService', MainService);

  MainService.$inject = ['$http', '$q', '$resource'];

  function MainService($http, $q, $resource) {
    var pageTitle = 'Nautilus Company | Custom Home Construction';

    var currentState = 'HOME';

    // CONTENTFUL
    const CONTENT_URL = 'https://cdn.contentful.com';
    const MEDIA_URL = 'https://images.contentful.com';
    const SPACE_ID = '80s1v057uxnv';
    const API_KEY = '361c4996eb1e9c4236cea0b5c21701c76f302ec59f42c1b5111d365c7faee500';

    const GET_URL = CONTENT_URL + '/spaces/' + SPACE_ID + '/entries?access_token=' + API_KEY + '&content_type=';

    // MAILCHIMP
    const MAILCHIMP_KEY = '1029176b8a172367513eab75bfd1d6b0-us2';

    function getPageTitle() {
      return pageTitle;
    }

    function setPageTitle(newTitle) {
      pageTitle = newTitle;
    }

    function getCurrentState() {
      return currentState;
    }

    function setCurrentState(newState) {
      currentState = newState;
    }

    function getPageContent(page) {
      var defer = $q.defer();

      $http.get(GET_URL + page).then(function(pageContent) {
        defer.resolve(pageContent.data.items[0].fields);
      });

      return defer.promise;
    }

    /**
    * angular-mailchimp
    * http://github.com/keithio/angular-mailchimp
    * License: MIT
    */
    function mailchimpResource(mailchimp) {
      var actions,
          MailChimpSubscription,
          params = {},
          url;


      mailchimp.username = "nautilusco";
      mailchimp.dc = "us2";
      mailchimp.u = "91fe70fad31765c3ac6ebfa04";
      mailchimp.id = "762b7f2fea";

      window.mc = mailchimp;
      console.log("MAILCHIMP: " + mailchimp);
      // Create a resource for interacting with the MailChimp API
      url = '//' + mailchimp.username + '.' + mailchimp.dc +
            '.list-manage.com/subscribe/post-json';

      var fields = Object.keys(mailchimp);

      for(var i = 0; i < fields.length; i++) {
        params[fields[i]] = mailchimp[fields[i]];
      }

      params.c = 'JSON_CALLBACK';

      actions = {
        'save': {
          method: 'jsonp'
        }
      };
      return $resource(url, params, actions);
    }

    return {
      getPageTitle: getPageTitle,
      setPageTitle: setPageTitle,
      getCurrentState: getCurrentState,
      setCurrentState: setCurrentState,
      getPageContent: getPageContent,
      mailchimpResource: mailchimpResource
   };
  }
