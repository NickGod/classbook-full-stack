'use strict';

/**
 * @ngdoc service
 * @name classbookApp.User
 * @description
 * # User
 * Factory in the classbookApp.
 */
angular.module('classbookApp')
  .factory('User', ['UtilService', '$http', '$q', 'SwapRequest', 'Class', 'Discussion',
    function (UtilService, $http, $q, SwapRequest, Class, Discussion) {
    // Public API here
    var User = function(uid, email, opts) {
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

        getAllEnrolledClasses: function() {
          console.log('/api/user/' + this.uid + '/getEnrolledClasses');
          return $http.get('/api/user/' + this.uid + '/getEnrolledClasses').then(function (resp) {
            // console.log(resp.data);
            var ret = [];
            if (resp.data instanceof Array) {
              // console.log('response is array');
              for (var lec in resp.data) {
                var clss = null;
                // console.log(resp.data[lec]);
                // console.log(lec);
                // if (resp.data[lec].hasOwnProperty("lectureId") &&
                //   resp.data[lec].hasOwnProperty("department") &&
                //   resp.data[lec].hasOwnProperty("className") &&
                //   resp.data[lec].hasOwnProperty("term") &&
                //   resp.data[lec].hasOwnProperty("discussions")) {
                //   clss = new Class(resp.data[lec].lectureId, resp.data[lec].department, resp.data[lec].className, resp.data[lec].term);
                //   for (var discussion in resp.data.lec.discussions) {
                //     clss.addDiscussions([new Discussion(discussion.discussionId, discussion.discussionName, discussion)]);
                //   }
                // }
                if (resp.data[lec] != null) {
                  ret.push(resp.data[lec]);
                  // console.log (ret);
                }
              }
            }
            // console.log(ret);
            return ret;
          });
        },

        getEnrolledClassesDetail: function() {
          console.log('/api/user/' + this.uid + '/getEnrolledClassesForDrop');
          return $http.get('/api/user/' + this.uid + '/getEnrolledClassesForDrop').then(function(resp) {
            var ret = [];
            if (resp.data instanceof Array) {
              for (var lec in resp.data) {
                if (resp.data[lec] != null) {
                  ret.push(resp.data[lec]);
                }
              }
            }
            console.log("Enrolled Class Detail");
            console.log(ret);
            return ret;
          });
        },

        enroll: function(discussion) {
          // alert(discussion);
          var discussionId;
          if (typeof discussion === "number") {
            discussionId = discussion;
          } else if (typeof discussion === "object") {
            if (discussion.hasOwnProperty("discussionId")) {
              discussionId = discussion.discussionId;
            } else {
              return $q.reject({error: true, errormsg: "Invalid argument."});
            }
          } else {
            return $q.reject({error: false, errormsg: "Invalid argument."});
          }

          return $http.post('/api/enrollment/enroll', {userId: this.uid, discussionId: discussionId});
        },

        dropClass: function(discussionId) {
          if (typeof discussionId !== "number") {
            return $q.reject({error: false, errormsg: "Invalid argument."});
          }
          console.log("DROP: " + this.uid + ' ' + discussionId);
          return $http.post('/api/enrollment/drop', {userId: this.uid, discussionId: discussionId});
        },

        getInfo: function() {
          return $http.get('/api/user/' + this.uid + '/info').then(function(resp) {
            console.log("getInfo");
            console.log(resp);
            var userInfo = {};
            if (resp.data) {
              for (var key in resp.data) {
                userInfo[key] = resp.data[key];
              }
              userInfo.gender = userInfo.sex;
              delete userInfo.error;
            }
            return userInfo;
          });
        },

        getFriends: function() {
          return $http.get('/api/user/' + this.uid + '/get_friends').then(function(resp) {
            var ret = [];
            console.log("Friends resp:");
            console.log(resp.data);

            for (var i in resp.data) {
              ret.push(resp.data[i]);
            }
            return ret;
          });
        },

        getPendingFriends: function() {
          return $http.get('/api/user/' + this.uid + '/get_pending_friends').then(function(resp) {
            var ret = [];
            for (var i in resp.data) {
              ret.push(resp.data[i]);
            }
            return ret;
          });
        },

        requestFriend: function(friendId) {
          var data = {
            my_id: this.uid,
            other_id: friendId
          };

          return $http.post('/api/user/request_friend', data);
        },

        acceptFriendRequest: function(friendId) {
          var data = {
            my_id: this.uid,
            other_id: friendId
          };

          return $http.post('/api/user/accept_friend_request', data);
        },

        createSwapRequest: function(has_dis, want_dis) {
          var data = {
            user_id: this.uid,
            has_dis: has_dis,
            want_dis: want_dis
          };

          return $http.post('/api/user/accept_friend_request', data).then(function(resp) {
            return new SwapRequest(resp.id, resp.user_id, resp.has_dis, resp.want_dis, resp);
          });
        },

        getAllSwapRequests: function() {
          return $http.get('/api/swap_request/' + this.uid).then(function(resp) {
            var ret = [];
            for (var req in resp.data) {
              var swapReq = new SwapRequest(req.id, req.user_id, req.has_dis, req.want_dis, req);
              if (swapReq != null && swapReq != undefined) {
                ret.push(swapReq);
              }
            }
            return ret;
          });
        },

        getAllMessages: function() {
          return $http.get('/api/message/' + this.uid + '/userMessages').then(function(resp) {
            var ret = [];
            for (var msg in resp.data) {
              var message = new Message(msg.id, msg.user_id, msg.category, msg.context, req);
              if (message != null && message != undefined) {
                ret.push(message);
              }
            }
            return ret;
          });
        }
      };
    };
    return User;
  }]);
