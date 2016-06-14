angular
  .module('nautilusApp')
  .service('CareersService', CareersService);

  CareersService.$inject = ['$http', '$q'];

  function CareersService($http, $q) {
    const CONTENT_URL = 'https://cdn.contentful.com';
    const MEDIA_URL = 'https://images.contentful.com';
    const SPACE_ID = '80s1v057uxnv';
    const API_KEY = '361c4996eb1e9c4236cea0b5c21701c76f302ec59f42c1b5111d365c7faee500';

    const GET_URL = CONTENT_URL + '/spaces/' + SPACE_ID + '/entries?access_token=' + API_KEY + '&content_type=';

    function getCareerListings() {
      var defer = $q.defer();

      $http.get(GET_URL + 'career').then(function(careerListings) {
        defer.resolve(careerListings);
      });

      return defer.promise;
    }

    return {
      getCareerListings: getCareerListings,
    };
  }
