angular
  .module('nautilusApp')
  .controller('NewsController', NewsController);

  function NewsController(NewsService, MainService, $rootScope, $stateParams, contentful, $state, Slug) {
    var vm = this;

    vm.thisYear = new Date().getFullYear();
    vm.filterYear = new Date().getFullYear();

    if ($stateParams.keyword) {
      vm.articleSearch = $stateParams.keyword;
    }

    if ($stateParams.topic) {
      vm.searchTopic = $stateParams.topic;
    }

    MainService
      .setCurrentState('NEWS');

    MainService
      .getPageContent('newsPage')
      .then(

        // Success handler
        function(mainContent){
          console.log(mainContent);
          MainService.setPageTitle(mainContent.pageTitle);
        },

        // Error handler
        function(response){
          console.log('Oops, error ' + response.status);
        }
      );

    vm.posts = [];
    var totalPosts = 0;
    var postsPerPage = 10;
    vm.currentPage = 1;

    initPosts();
    getFeaturedPost();

    function getFeaturedPost() {
      contentful
      .entries('content_type=newsPost&include=3&fields.featured=true&limit=1')
      .then(function(res) {
        vm.featuredPost = res.data.items[0];
      });
    }

    function initPosts() {
      var queryString = 'content_type=newsPost&include=3&order=-fields.date&fields.date[gte]=' + vm.filterYear + '-01-01&fields.date[lt]=' + (vm.filterYear + 1) + '-01-01&limit=' + postsPerPage;
      if (vm.articleSearch) {
        queryString += '&query=' + vm.articleSearch;
      }
      contentful
      .entries(queryString)
      .then(function(res) {
        vm.posts = res.data.items;
        totalPosts = res.data.total;

        console.log(vm.posts);
        vm.pages = [];
        var numberOfPages = Math.ceil(totalPosts / postsPerPage);
        for (var i = 1; i <= numberOfPages; i++) {
          vm.pages.push(i);
        }
      });
    }

    vm.selectSearchTopic = function(topic) {
      if (vm.searchTopic !== topic) {
        $state.go('news', { topic: topic });
      } else {
        $state.go('news', { topic: '' });
      }
    };

    vm.submitSearch = function(tag) {
      if (tag) {
        $state.go('news', { keyword: tag, topic: '' });
      } else {
        $state.go('news', { keyword:vm.articleSearch, topic:vm.searchTopic });
      }
    };

    vm.getPage = function(pageNumber) {
      getResultsPage(pageNumber);
      vm.currentPage = pageNumber;
    };

    function getResultsPage(pageNumber) {
      contentful
        .entries('content_type=newsPost&include=3&order=-fields.date&fields.date[gte]=' + vm.filterYear + '-01-01&fields.date[lt]=' + (vm.filterYear + 1) + '-01-01&limit=' + postsPerPage + '&skip=' + ((pageNumber - 1) * postsPerPage))
        .then(function(res) {
          vm.posts = res.data.items;
          console.log(vm.posts);
        });
    }

    vm.getYearPosts = function(filterYear) {
      vm.filterYear = filterYear;
      vm.currentPage = 1;
      initPosts();
    };


    vm.slugify = function(string) {
      return Slug.slugify(string);
    };

    if ($stateParams.postID) {

    contentful
      .entries('sys.id=' + $stateParams.postID + '&include=3')
      .then(

        // Success handler
        function(response){
          vm.selectedPost = response.data.items[0];

          if(vm.selectedPost.fields.gallery) {
            vm.selectedPost.fields.gallery.forEach(function(image, idx) {
              image.index = idx;
            });
          }

          MainService.setPageTitle(vm.selectedPost.fields.title);
          var d = new Date(vm.selectedPost.fields.date);
          vm.selectedPost.fields.day = d.getDate();
          vm.selectedPost.fields.month = getMonthAbbrev(d.getMonth());
          vm.selectedPost.fields.year = d.getFullYear();
          console.log(vm.selectedPost);
        },

        // Error handler
        function(response){
          console.log('Oops, error ' + response.status);
        }
      );
    }

    function getMonthAbbrev(monthNum) {
      switch(monthNum) {
        case 0: return 'Jan';
        case 1: return 'Feb';
        case 2: return 'Mar';
        case 3: return 'Apr';
        case 4: return 'May';
        case 5: return 'Jun';
        case 6: return 'Jul';
        case 7: return 'Aug';
        case 8: return 'Sep';
        case 9: return 'Oct';
        case 10: return 'Nov';
        case 11: return 'Dec';
      }
    }

    vm.selectPhoto = function(index) {
      vm.selectedProjectImage = vm.selectedPost.fields.gallery[index];
      console.log(vm.selectedProjectImage);
    };

    vm.nextPhoto = function(index){
      if(index === vm.selectedPost.fields.gallery.length - 1) {
        vm.selectPhoto(0);
      } else {
        vm.selectPhoto(++index);
      }
    };

    vm.prevPhoto = function(index){
      if(index === 0) {
        vm.selectPhoto(vm.selectedPost.fields.gallery.length - 1);
      } else {
        vm.selectPhoto(--index);
      }
    };
  }
