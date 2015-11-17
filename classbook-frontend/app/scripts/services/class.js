'use strict';

/**
 * @ngdoc service
 * @name classbookApp.Class
 * @description
 * # Class
 * Factory in the classbookApp.
 */
angular.module('classbookApp')
  .factory('Class', '$http', function ($http) {

    return function(lectureId, department, className, term, opts) {

      if (lectureId == null || lectureId == undefined) {
        return null;
      }

      var ret =  {
        lectureId: lectureId,
        department: department,
        className: className,
        term: term,
        discussions: [],
        addDiscussions: function (discussions) {
          this.discussions.concat(discussions);
        }
      };

      for (var key in opts) {
        if (!(key in ret)) {
          ret[key] = opts[key];
        }
      }

      return ret;
    };
  });
