angular
  .module('nautilusApp')
  .controller('NewsController', NewsController);

  function NewsController(NewsService) {
    var vm = this;

    NewsService.getMainContent().then(function(mainContent) {
      // TO BE EDITED AFTER CLIENT ADDS CONTENT
      // SOME FIELDS MIGHT REQUIRE FURTHER PROCESSING
      vm.bannerImage = mainContent.data.items;
      vm.bannerImageDescription = mainContent.data.items;
      vm.mediaInquiriesText = mainContent.data.items;
    });

    NewsService.getNewsPosts().then(function(newsPosts) {
      // console.log("news posts: " + newsPosts.data.items);
      window.news = newsPosts.data.items;
      vm.newsPosts = newsPosts.data.items;

      // console.log("news images: " + newsPosts.data.includes.Asset);
      // window.newsImages = newsPosts.data.includes.Asset;
      var imageArr = newsPosts.data.includes.Asset;

      var imageId;

      angular.forEach(vm.newsPosts, function(newsPost) {
        // console.log("news post: " + teamMember.fields.title);

        imageId = newsPost.fields.thumbnailImage.sys.id;
        // console.log("news post thumbnail id: " + imageId);

        angular.forEach(imageArr, function (image) {
          if (image.sys.id == imageId) {
            newsPost.fields.thumbnailImageUrl = image.fields.file.url;
          }
        });
      });
    });
  }
