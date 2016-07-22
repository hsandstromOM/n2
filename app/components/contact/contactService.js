angular
  .module('nautilusApp')
  .service('ContactService', ContactService);

  ContactService.$inject = ['$http', '$q'];

  function ContactService($http, $q) {
    // CONTENTFUL
    const CONTENT_URL = 'https://cdn.contentful.com';
    const MEDIA_URL = 'https://images.contentful.com';
    const SPACE_ID = '80s1v057uxnv';
    const API_KEY = '361c4996eb1e9c4236cea0b5c21701c76f302ec59f42c1b5111d365c7faee500';

    const GET_URL = CONTENT_URL + '/spaces/' + SPACE_ID + '/entries?access_token=' + API_KEY + '&content_type=';

    // MAILCHIMP
    const MAILCHIMP_KEY = '1029176b8a172367513eab75bfd1d6b0-us2';

    function getMainContent() {
      var defer = $q.defer();

      $http.get(GET_URL + 'contactUsPage&include=1').then(function(mainContent) {
        defer.resolve(mainContent);
      });

      return defer.promise;
    }

    return {
      getMainContent: getMainContent,
    };
  }
