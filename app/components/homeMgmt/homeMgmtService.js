angular
  .module('nautilusApp')
  .service('HomeMgmtService', HomeMgmtService);

  HomeMgmtService.$inject = ['$http', '$q'];

  function HomeMgmtService($http, $q) {
    // INSERT CUSTOM HOMES DATA
    var homeMgmtPortfolio = [
        {
          number: 0,
          name: "Daniel Island",
          subtitle: "Residence - Home Management",
          image: "http://placehold.it/600x320",
        },
        {
          number: 1,
          name: "Isle of Palms",
          subtitle: "Residence - Home Management",
          image: "http://placehold.it/600x320",
        }
    ];

    getHomeMgmtPortfolio = function() {
      return homeMgmtPortfolio;
    };

    return {
      getHomeMgmtPortfolio: getHomeMgmtPortfolio,
      // getProject: getProject
    };
  }
