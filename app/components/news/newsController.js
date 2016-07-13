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

    vm.allPosts = [];

    contentful.entries('content_type=post&include=3').then(function(res) {
      var entries = res.data;
      entries.items.forEach(function (entry) {
          vm.allPosts.push(entry);
        });
      console.log(vm.allPosts);
    });

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
        case 1: return 'Jan';
        case 2: return 'Feb';
        case 3: return 'Mar';
        case 4: return 'Apr';
        case 5: return 'May';
        case 6: return 'Jun';
        case 7: return 'Jul';
        case 8: return 'Aug';
        case 9: return 'Sep';
        case 10: return 'Oct';
        case 11: return 'Nov';
        case 12: return 'Dec';
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
