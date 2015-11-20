'use strict';

/**
 * @ngdoc service
 * @name classbookApp.User
 * @description
 * # User
 * Factory in the classbookApp.
 */
angular.module('classbookApp')
  .factory('User', ['UtilService', '$http', '$q', 'User', 'SwapRequest', 'Class', 'Discussion',
    function (UtilService, $http, $q, User, SwapRequest, Class, Discussion) {
    // Public API here
    return function(uid, email, opts) {
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
            var ret = [];
            if (typeof resp === 'array') {
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
            }
          });
        },

        enroll: function(discussion) {
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

          return $http.post('/api/enrollment/enroll', {userid: this.uid, discussionid: discussionId});
        },

        getInfo: function() {
          var self = this;
          return $http.get('/api/user/' + this.uid + '/info').then(function (resp) {
            if (resp.hasOwnProperty('id') && resp.id == self.uid) {
              for (var key in resp) {
                this[key] = resp[key];
              }
            }
            return this;
          });
        },

        getFriends: function() {
          return $http.get('/api/user/' + this.uid + '/get_friends').then(function(resp) {
            var ret = [];
            for (var friend in resp) {
              var user = new User(friend.id, friend.email);
              ret.push(user);
              user.getInfo();
            }
            return ret;
          });
        },

        getPendingFriends: function() {
          return $http.get('/api/user/' + this.uid + '/get_pending_friends').then(function(resp) {
            var ret = [];
            for (var friend in resp) {
              var user = new User(friend.id, friend.email);
              user.getInfo().then(function(resp) {
                ret.push(user);
              });
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
            for (var req in resp) {
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
            for (var msg in resp) {
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
  }]);
