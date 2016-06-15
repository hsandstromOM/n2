angular
  .module('nautilusApp')
  .service('HomeMgmtService', HomeMgmtService);

  HomeMgmtService.$inject = ['$http', '$q'];

  function HomeMgmtService($http, $q) {
    const CONTENT_URL = 'https://cdn.contentful.com';
    const MEDIA_URL = 'https://images.contentful.com';
    const SPACE_ID = '80s1v057uxnv';
    const API_KEY = '361c4996eb1e9c4236cea0b5c21701c76f302ec59f42c1b5111d365c7faee500';

    const GET_URL = CONTENT_URL + '/spaces/' + SPACE_ID + '/entries?access_token=' + API_KEY + '&content_type=';

    function getMainContent() {
      var defer = $q.defer();

      $http.get(GET_URL + 'homeManagementPage&include=1').then(function(mainContent) {
        defer.resolve(mainContent);
      });

      return defer.promise;
    }

    function getHomeMgmtPortfolio() {
      var defer = $q.defer();

      $http.get(GET_URL + 'homeManagementProject&include=1').then(function(homeMgmtPortfolio) {
        defer.resolve(homeMgmtPortfolio);
      });

      return defer.promise;
    }

    // DUMMY DATA
    var homeMgmtPortfolio = [
        {
          number: 0,
          name: "Daniel Island",
          subtitle: "Residence - Home Management",
          image: "assets/img/home-mgt-thumbnail.jpg",
        },
        {
          number: 1,
          name: "Isle of Palms",
          subtitle: "Residence - Home Management",
          image: "assets/img/home-mgt-thumbnail.jpg",
        },
        {
          number: 2,
          name: "Daniel Island",
          subtitle: "Residence - Home Management",
          image: "assets/img/home-mgt-thumbnail.jpg",
        },
        {
          number: 3,
          name: "Isle of Palms",
          subtitle: "Residence - Home Management",
          image: "assets/img/home-mgt-thumbnail.jpg",
        },
        {
          number: 4,
          name: "Daniel Island",
          subtitle: "Residence - Home Management",
          image: "assets/img/home-mgt-thumbnail.jpg",
        },
        {
          number: 5,
          name: "Isle of Palms",
          subtitle: "Residence - Home Management",
          image: "assets/img/home-mgt-thumbnail.jpg",
        },
        {
          number: 6,
          name: "Daniel Island",
          subtitle: "Residence - Home Management",
          image: "assets/img/home-mgt-thumbnail.jpg",
        },
        {
          number: 7,
          name: "Isle of Palms",
          subtitle: "Residence - Home Management",
          image: "assets/img/home-mgt-thumbnail.jpg",
        },
        {
          number: 8,
          name: "Daniel Island",
          subtitle: "Residence - Home Management",
          image: "assets/img/home-mgt-thumbnail.jpg",
        }
    ];

    getDummyPortfolio = function() {
      return homeMgmtPortfolio;
    };

    return {
      getMainContent: getMainContent,
      getHomeMgmtPortfolio: getHomeMgmtPortfolio,
      getDummyPortfolio: getDummyPortfolio,
    };
  }
