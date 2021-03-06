angular
  .module('nautilusApp')
  .service('AboutService', AboutService);

  AboutService.$inject = ['$http', '$q'];

  function AboutService($http, $q) {
    const CONTENT_URL = 'https://cdn.contentful.com';
    const MEDIA_URL = 'https://images.contentful.com';
    const SPACE_ID = '80s1v057uxnv';
    const API_KEY = '361c4996eb1e9c4236cea0b5c21701c76f302ec59f42c1b5111d365c7faee500';

    const GET_URL = CONTENT_URL + '/spaces/' + SPACE_ID + '/entries?access_token=' + API_KEY + '&content_type=';

    function getTeamMembers() {
      var defer = $q.defer();

      $http.get(GET_URL + 'teamMember&include=3').then(function(teamMembers) {
        defer.resolve(teamMembers.data.items);
      });

      return defer.promise;
    }

    return {
      getTeamMembers: getTeamMembers,
    };
  }
