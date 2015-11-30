'use strict';

/**
 * @ngdoc service
 * @name classbookApp.SearchService
 * @description
 * # SearchService
 * Service in the classbookApp.
 */
angular.module('classbookApp')
  .service('SearchService', [ 'Class', 'Discussion', 'User', '$http', function (Class, Discussion, User, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {

      /**
       * Search for classes using certain key-fields.
       * Current supported key-fields are className, department, discussion and term.
       *
       * @returns {Promise} The argument of the success callback will be a list of classes.
       */
      searchClasses: function (classInfo) {
        var url = "/api/search?";
        var params = [];
        for (var field in classInfo) {
          if (classInfo[field].length > 0) {
            params.push(field + '=' + classInfo[field]);
          }
        }

        url += params.join('&');

        console.log(url);
        return $http.get(url)
          .then(function (resp) {
            if (!resp){
              throw new Error('Response is NULL.');
              return;
            }

            var ret = resp.data;

            // for (var lec in resp.data) {
            //   console.log(lec);
            //   var clss = null;
            //   if (lec.hasOwnProperty("lectureId") &&
            //     lec.hasOwnProperty("department") &&
            //     lec.hasOwnProperty("className") &&
            //     lec.hasOwnProperty("term") &&
            //     lec.hasOwnProperty("discussions")) {
            //     clss = new Class(lec.lectureId, lec.department, lec.className, lec.term);
            //     for (var discussion in lec.discussions) {
            //       clss.addDiscussions([new Discussion(discussion.discussionId, discussion.discussionName, discussion)]);
            //     }
            //   }
              // if (clss != null) {
              //   ret.push(clss);
              // }
            // }
            return ret;
          });
      },

      getUserById: function(uid) {
        var url = "/api/user/" + uid + '/info';
        var params = uid;

        return $http.get(url).then(function(res) {

          console.log(res.data);
          var user_info = res.data;
          return user_info;

        });
      },

      searchUser: function(userInfo) {
        var url = "/api/user/search?";
        var params = [];
        for (var field in userInfo) {
          params.push(field + '=' + userInfo[field]);
        }

        url += params.join('&');

        return $http.get(url).then(function(resp) {
          var ret = [];
          if (resp.data instanceof Array) {
            for (var userIndex in resp.data) {
              ret.push(resp.data[userIndex]);
            }
          }
          console.log("Search User");
          console.log(ret);
          return ret;
        });
      },

      getDiscussionById: function(id) {
        var url = "/api/discussion/get_discussions?ids=[" + id + "]";
        // var params = [id];
        // url += params.join('&');


        return $http.get(url).then(function(resp) {
          var ret = [];
          if (resp.data instanceof Array) {
            for (var i in resp.data) {
              ret.push(resp.data[i]);
            }
          }
          console.log("Search Discussion");
          console.log(ret);
          return ret;
        });
      }
    }
  }]);
