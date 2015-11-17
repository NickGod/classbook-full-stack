'use strict';

/**
 * @ngdoc service
 * @name classbookApp.User
 * @description
 * # User
 * Factory in the classbookApp.
 */
angular.module('classbookApp')
  .factory('User', ['UtilService', '$http', function (UtilService, $http) {
    // Public API here
    return function(uid, email) {
      // Validate parameters.
      if (parseInt(uid).toString() != uid) {
        console.log("DEBUG: user.js: uid is not valid.");
        return null;
      }

      if (!UtilService.isValidEmailAddress(email)) {
        console.log("DEBUG: user.js: email is not valid.");
        return null;
      }

      return {
        uid: uid,
        email: email,
        firstName: "Joe",
        lastName: "Bruin",
        year: 1970,
        getAllEnrolledClasses: function() {
          console.log('/api/user/' + this.uid + '/getEnrolledClasses');
          return $http.get('/api/user/' + this.uid + '/getEnrolledClasses').then(function(resp) {
            // For now, we do not make any modification to the response.
            return resp;
          });
        }
      };
    };
  }]);
