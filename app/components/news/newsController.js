angular
  .module('nautilusApp')
  .controller('NewsController', NewsController);

  function NewsController(NewsService, MainService, $stateParams, contentful, $state) {
    var vm = this;

    if ($stateParams.input) {
      vm.articleSearch = $stateParams.input;
    }

    if ($stateParams.topic) {
      vm.searchTopic = $stateParams.topic;
    } else {
      vm.searchTopic = '';
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
    vm.totalPosts = 0;
    vm.pages = [];
    vm.postsPerPage = 25;

    contentful
      .entries('content_type=newsPost&include=3&order=-fields.date&limit=25')
      .then(function(res) {
        vm.posts = res.data.items;
        vm.totalPosts = res.data.total;

        var numberOfPages = Math.ceil(vm.totalPosts / vm.postsPerPage);
        for (var i = 1; i <= numberOfPages; i++) {
          vm.pages.push(i);
        }
        console.log(vm.posts);
        console.log(vm.totalPosts);
        console.log(vm.pages);
      });

    vm.getPage = function(pageNumber) {
      getResultsPage(pageNumber);
    };

    function getResultsPage(pageNumber) {
      contentful
        .entries('content_type=newsPost&include=3&order=-fields.date&limit=25&skip=' + ((pageNumber - 1) * 25))
        .then(function(res) {
          vm.posts = res.data.items;
          console.log(vm.posts);
        });
    }

    if ($stateParams.postID) {
      console.log("newsPage: " + $stateParams.postID);
      vm.postID = $stateParams.postID;
      // Get all entries
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

    vm.selectSearchTopic = function(topic) {
      vm.searchTopic = vm.searchTopic === topic ? '' : topic;
    };

    vm.selectSearchTopicRoute = function(topic) {
      $state.go('news', { topic:topic });
    };

    vm.submitSearch = function(input) {
      $state.go('news', { input:input });
    };
  }
