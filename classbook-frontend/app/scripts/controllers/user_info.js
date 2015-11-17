'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:UserInfoCtrl
 * @description
 * # UserInfoCtrl
 * Controller of the classbookApp
 */
angular.module('classbookApp')
  .controller('UserInfoCtrl', [
  '$scope','AuthService',
  function ($scope, AuthService) {
   $scope.auth = AuthService;
   $scope.tab = 1;
   $scope.user_name = "Mengyuan";
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

}
]);
