'use strict';

/**
 * @ngdoc service
 * @name classbookApp.SwapRequest
 * @description
 * # SwapRequest
 * Factory in the classbookApp.
 */
angular.module('classbookApp')
  .factory('SwapRequest', function () {
    return function(id, uid, has_dis, want_dis, opts) {
      if (id == null || id == undefined) {
        return null;
      }

      var ret = {
        id: id,
        uid: uid,
        has_dis: has_dis,
        want_dis: want_dis,

        //send the swap request
        sendSwapRequest: function() {

          return $http.post('/api/swap_request/create', {userid: this.uid, has_dis: this.has_dis, want_dis: this.want_dis});

        }
      };

      for (var key in opts) {
        if (!(key in ret)) {
          ret[key] = opts[key];
        }
      }

      return ret;
    }
  });
