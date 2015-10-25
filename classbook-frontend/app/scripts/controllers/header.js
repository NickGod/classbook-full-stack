'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the classbookApp
 */
angular.module('classbookApp')
  .controller('HeaderCtrl', ['$scope', 'AuthService', function ($scope, AuthService) {
    $scope.auth = AuthService;
  }]);
