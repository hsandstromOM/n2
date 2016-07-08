angular
  .module('nautilusApp')
  .controller('NewsController', NewsController);

  function NewsController(NewsService, MainService, $stateParams, contentful) {
    var vm = this;

    vm.searchTopic = '';

    MainService
      .setCurrentState('NEWS');

    MainService.setPageTitle('Nautilus Company | News');
    // MainService
    //   .getPageContent('newsPage')
    //   .then(
    //
    //     // Success handler
    //     function(mainContent){
    //       console.log(mainContent);
    //       MainService.setPageTitle(mainContent.pageTitle);
    //     },
    //
    //     // Error handler
    //     function(response){
    //       console.log('Oops, error ' + response.status);
    //     }
    //   );

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

    vm.selectSearchTopic = function(topic) {
      vm.searchTopic = vm.searchTopic === topic ? '' : topic;
    };
  }
