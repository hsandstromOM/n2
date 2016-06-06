angular
  .module('nautilusApp')
  .service('NewsService', NewsService);

  NewsService.$inject = ['$http', '$q'];

  function NewsService($http, $q) {

  }
