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

    getHomeMgmtPortfolio = function() {
      return homeMgmtPortfolio;
    };

    return {
      getHomeMgmtPortfolio: getHomeMgmtPortfolio,
      // getProject: getProject
    };
  }
