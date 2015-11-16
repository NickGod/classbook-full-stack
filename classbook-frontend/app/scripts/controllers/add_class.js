'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:AddClassCtrl
 * @description
 * # AddClassCtrl
 * Controller of the classbookApp
 */
angular.module('classbookApp')
  .controller('AddClassCtrl', ['$scope', function ($scope) {
    
    $scope.tab = 1;
    // console.log($scope.tab);
    // $scope.$on('$viewContentLoaded', function(){
    //   $scope.tab = 1;
    //   console.log("HERE");
    //   console.log($scope.tab);
    //   $scope.apply();
    // });
  }
]);
