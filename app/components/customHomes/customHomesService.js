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
          image: "http://placehold.it/600x350",
          heading: "A new construction for a new family",
          summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          gallery: ["http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200",]
        },
        {
          number: 0,
          name: "Daniel Island Park",
          subtitle: "Residence - New Construction",
          image: "http://placehold.it/600x350",
          heading: "A new construction for a new family",
          summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          gallery: ["http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200",]
        },
        {
          number: 0,
          name: "Daniel Island Park",
          subtitle: "Residence - New Construction",
          image: "http://placehold.it/600x350",
          heading: "A new construction for a new family",
          summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          gallery: ["http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200",]
        },
        {
          number: 0,
          name: "Daniel Island Park",
          subtitle: "Residence - New Construction",
          image: "http://placehold.it/600x350",
          heading: "A new construction for a new family",
          summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          gallery: ["http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200",]
        },
    ];

    getCustomHomes = function() {
      return customHomes;
    };

    getSelectedHome = function(selectedId) {
      var selectedHome = customHomes.filter(function(home) {
        return home.number == selectedId;
      });
      console.log("got selectedHome #: " + selectedHome.number);

      return selectedHome[0];
    };

    return {
      getCustomHomes: getCustomHomes,
      getSelectedHome: getSelectedHome
    };
  }
