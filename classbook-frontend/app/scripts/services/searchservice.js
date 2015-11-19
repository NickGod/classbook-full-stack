'use strict';

/**
 * @ngdoc service
 * @name classbookApp.SearchService
 * @description
 * # SearchService
 * Service in the classbookApp.
 */
angular.module('classbookApp')
  .service('SearchService', 'Class', 'Discussion', 'User', function (Class, Discussion, User) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {

      /**
       * Search for classes using certain key-fields.
       * Current supported key-fields are className, department, discussion and term.
       *
       * @returns {Promise} The argument of the success callback will be a list of classes.
       */
      searchClasses: function (params) {
        var url = "/api/search?";
        var first = true;
        for (var key in params) {
          if (first) {
            url = url + key + "=" + value;
            first = false;
          } else {
            url = url + "&" + key + "=" + value;
          }
        }
        return $http.get(url)
          .then(function (resp) {
            var ret = [];
            for (var lec in resp) {
              var clss = null;
              if (lec.hasOwnProperty("lectureId") &&
                lec.hasOwnProperty("department") &&
                lec.hasOwnProperty("className") &&
                lec.hasOwnProperty("term") &&
                lec.hasOwnProperty("discussions")) {
                clss = new Class(lec.lectureId, lec.department, lec.className, lec.term);
                for (var discussion in lec.discussions) {
                  clss.addDiscussions([new Discussion(discussion.discussionId, discussion.discussionName, discussion)]);
                }
              }
              if (clss != null) {
                ret.push(clss);
              }
            }
            return ret;
          });
      },

      getUserById: function(uid) {
        var user = new User(uid);
        return user.getInfo();
      }
    }
  });
