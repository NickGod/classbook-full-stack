'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the classbookApp
 */
angular.module('classbookApp')
  .controller('GroupsCtrl', ['$scope', 'Group', function ($scope, Group) {
    // $scope.groups = Group.query();
    // $scope.groups = [{name: 'nicho'}, {name: 'mothafucka'}];
    $scope.collections = Group.query();
    console.log($scope.groups);
  }]);
