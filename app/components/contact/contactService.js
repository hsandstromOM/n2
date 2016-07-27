angular
  .module('nautilusApp')
  .service('ContactService', ContactService);

  ContactService.$inject = ['$http', '$q'];

  function ContactService($http, $q) {


    function sendEmail(message) {
      var deferred = $q.defer();

      $http.post('/api/email', message)
      .then(function(data, status, headers, config) {
        console.log("success");
        deferred.resolve(data);
      });
      // .error(function(err) {
      //   console.log("err" + err);
      //   deferred.reject();
      // });

      return deferred.promise;
    }

    return {
      sendEmail: sendEmail,
    };
  }
