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
      var entries = res.data
      entries.items.forEach(function (entry) {
          vm.allPosts.push(entry)
        })
      console.log(vm.allPosts);
    });

    if ($stateParams.postID) {
      console.log("newsPage: " + $stateParams.postID);
      vm.postID = $stateParams.postID;
      // Get all entries
    contentful
      .entries('sys.id=' + $stateParams.postID)
      .then(

        // Success handler
        function(response){
          vm.selectedPost = response.data.items[0];
          MainService.setPageTitle(vm.selectedPost.fields.title);
          var d = new Date(vm.selectedPost.fields.date);
          var dStr = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();
          vm.selectedPost.fields.prettyDate = dStr;
          console.log(vm.selectedPost);
        },

        // Error handler
        function(response){
          console.log('Oops, error ' + response.status);
        }
      );
    }

    vm.selectSearchTopic = function(topic) {
      vm.searchTopic = vm.searchTopic === topic ? '' : topic;
    };
  }
