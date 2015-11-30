'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:MessageBoxCtrl
 * @description
 * # MessageBoxCtrl
 * Controller of the classbookApp
 */
angular.module('classbookApp')
  .controller('MessageBoxCtrl', ['$scope', '$uibModalInstance', 'items',
  function ($scope, $uibModalInstance, items) {
    $scope.title = items.title;
    $scope.message = items.message;
    $scope.isMessageOnly = items.isMessageOnly;

    $scope.ok = function() {
      $uibModalInstance.close(true);
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
]);
