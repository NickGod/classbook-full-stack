'use strict';

/**
 * @ngdoc service
 * @name classbookApp.Discussion
 * @description
 * # Discussion
 * Factory in the classbookApp.
 */
angular.module('classbookApp')
  .factory('Discussion', function () {

    return function(discussionId, discussionName, opts) {

      if (!discussionId || !discussionName) {
        return null;
      }

      var ret = {
        discussionId: discussionId,
        discussionName: discussionName
      };

      for (var key in opts) {
        if (!(key in ret)) {
          ret[key] = opts[key];
        }
      }

      return ret;
    };
  });
