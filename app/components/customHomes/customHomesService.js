angular
  .module('nautilusApp')
  .service('CustomHomesService', CustomHomesService);

  CustomHomesService.$inject = ['$http', '$q'];

  function CustomHomesService($http, $q) {
    const CONTENT_URL = 'https://cdn.contentful.com';
    const MEDIA_URL = 'https://images.contentful.com';
    const SPACE_ID = '80s1v057uxnv';
    const API_KEY = '361c4996eb1e9c4236cea0b5c21701c76f302ec59f42c1b5111d365c7faee500';

    const GET_URL = CONTENT_URL + '/spaces/' + SPACE_ID + '/entries?access_token=' + API_KEY + '&content_type=';

    function getMainContent() {
      var defer = $q.defer();

      $http.get(GET_URL + 'customHomesPage&include=1').then(function(mainContent) {
        defer.resolve(mainContent);
      });

      return defer.promise;
    }

    function getCustomHomes() {
      var defer = $q.defer();

      $http.get(GET_URL + 'customHome&include=1').then(function(customHomes) {
        defer.resolve(customHomes);
      });

      return defer.promise;
    }
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
          name: "Ralston Green",
          subtitle: "Residence - New Construction",
          image: "http://placehold.it/600x350",
          heading: "A new construction for a new family",
          summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          gallery: ["http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200",]
        },
        {
          number: 0,
          name: "Sunroom",
          subtitle: "Residence - Addition",
          image: "http://placehold.it/600x350",
          heading: "A new construction for a new family",
          summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          gallery: ["http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200",]
        },
        {
          number: 0,
          name: "Daniel Island",
          subtitle: "Residence - New Construction",
          image: "http://placehold.it/600x350",
          heading: "A new construction for a new family",
          summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          gallery: ["http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200","http://placehold.it/200x200",]
        },
    ];

    getDummyHomes = function() {
      return customHomes;
    };

    getSelectedDummyHome = function(selectedId) {
      var selectedHome = customHomes.filter(function(home) {
        return home.number == selectedId;
      });
      console.log("got selectedHome #: " + selectedHome.number);

      return selectedHome[0];
    };

    return {
      getMainContent: getMainContent,
      getCustomHomes: getCustomHomes,
      getDummyHomes: getDummyHomes,
      getSelectedDummyHome: getSelectedDummyHome,
    };
  }
