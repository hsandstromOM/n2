angular
  .module('nautilusApp')
  .service('CustomHomesService', CustomHomesService);

  CustomHomesService.$inject = ['$http', '$q'];

  function CustomHomesService($http, $q) {
    // INSERT CUSTOM HOMES DATA
    var customHomes = [
        {
          number: 0,
          name: "Daniel Island Park",
          subtitle: "Residence - New Construction",
          image: "http://fillmurray.com/600/350",
        },
        {
          number: 1,
          name: "Ralston Green",
          subtitle: "Residence - New Construction",
          image: "http://placehold.it/600x350",
        },
        {
          number: 2,
          name: "Ralston Green",
          subtitle: "Residence - New Construction",
          image: "http://placehold.it/600x350",
        },
        {
          number: 3,
          name: "Daniel Island Park",
          subtitle: "Residence - New Construction",
          image: "http://fillmurray.com/600/350",
        },
    ];

    getCustomHomes = function() {
      return customHomes;
    };

    return {
      getCustomHomes: getCustomHomes,
      // getProject: getProject
    };
  }
