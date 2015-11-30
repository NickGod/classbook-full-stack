'use strict';

/**
 * @ngdoc service
 * @name classbookApp.SwapRequest
 * @description
 * # SwapRequest
 * Factory in the classbookApp.
 */
angular.module('classbookApp')
  .factory('SwapRequest', ['$http', function ($http) {
    return function(uid, has_dis, want_dis, opts) {

      var ret = {
        uid: uid,
        has_dis: has_dis,
        want_dis: want_dis,

        //send the swap request
        sendSwapRequest: function() {

          console.log(this.uid);
          console.log(this.has_dis);
          console.log(this.want_dis);

          return $http.post('/api/swap_request/create', {user_id: this.uid, has_dis: this.has_dis, want_dis: this.want_dis});

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
