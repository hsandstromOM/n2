angular
  .module('nautilusApp')
  .service('NewsService', NewsService);

  NewsService.$inject = ['$http', '$q'];

  function NewsService($http, $q) {
    const CONTENT_URL = 'https://cdn.contentful.com';
    const MEDIA_URL = 'https://images.contentful.com';
    const SPACE_ID = '80s1v057uxnv';
    const API_KEY = '361c4996eb1e9c4236cea0b5c21701c76f302ec59f42c1b5111d365c7faee500';

    const GET_URL = CONTENT_URL + '/spaces/' + SPACE_ID + '/entries?access_token=' + API_KEY + '&content_type=';

    function getNewsPosts() {
      var defer = $q.defer();

      $http.get(GET_URL + 'newsPost&include=1').then(function(newsPosts) {
        defer.resolve(newsPosts);
      });

      return defer.promise;
    }

    return {
      getNewsPosts: getNewsPosts,
    };
  }
