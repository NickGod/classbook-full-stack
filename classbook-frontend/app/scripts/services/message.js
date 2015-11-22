'use strict';

/**
 * @ngdoc service
 * @name classbookApp.Message
 * @description
 * # Message
 * Factory in the classbookApp.
 */
angular.module('classbookApp')
  .factory('Message', ['SwapRequest', function(SwapRequest) {
    return function(id, user_id, category, context, opts) {
      if (id == null || id == undefined) {
        return null;
      }

      if (user_id == null || user_id == undefined) {
        return null;
      }

      if (category == null || category == undefined) {
        return null;
      }

      var ret = {
        id: id,
        user_id: user_id,
        category: category,
        context: context,

        /**
         * Mark the message as read.
         *
         * @returns {Promise} A $http promise that contains raw data from server.
         *                    On success, the read field of the message will be
         *                    set to true.
         */
        markAsRead: function() {
          var self = this;
          return $http.post("/api/message/" + this.id + "read").then(function(resp) {
            self.read = true;
            return resp;
          });
        }
      };

      for (var key in opts) {
        if (!(key in ret)) {
          ret[key] = opts[key];
        }
      }
      return ret;
    }
  }]);
