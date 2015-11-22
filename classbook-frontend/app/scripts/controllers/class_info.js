'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:ClassInfoCtrl
 * @description
 * # ClassInfoCtrl
 * Controller of the classbookApp
 */
angular.module('classbookApp')
  .controller('ClassInfoCtrl', ['$scope', '$uibModalInstance', 'items',
  function ($scope, $uibModalInstance, items) {
    items = {className: "CS130", title: "Software Engineering"};
    $scope.classInfo = items;
  }
]);
