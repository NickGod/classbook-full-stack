'use strict';

/**
 * @ngdoc service
 * @name classbookApp.groups
 * @description
 * # groups
 * Service in the classbookApp.
 */
angular.module('classbookApp')
  .service('Group', ['$resource', function($resource) {
  return $resource('/api/groups/:id.json', null, {
    'update': { method:'PUT' }
  });
}]);