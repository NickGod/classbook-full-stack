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
    function formatTime(days, startTime, endTime) {
      var i;
      var time = '';

      for(i = 0; i < days.length; i++) {
        switch (days[i]) {
          case 0:
            time += 'Sun';
            break;

          case 1:
            time += 'M';
            break;

          case 2:
            time += 'T';
            break;

          case 3:
            time += 'W';
            break;

          case 4:
            time += 'R';
            break;

          case 5:
            time += 'F';
            break;

          case 6:
            time += 'Sat';
            break;

          default:
            console.log("ERROR: invalid days");
            break;
        }
      }

      time += ' ' + startTime.substring(0, startTime.length - 3) + '-' + endTime.substring(0, startTime.length - 3);

      return time;
    }
    console.log(items);
    $scope.classInfo = items;
    $scope.drop = function() {
      $uibModalInstance.close($scope.classInfo.discussionId);
    };

    $scope.lectureTime = formatTime($scope.classInfo.classData.days, $scope.classInfo.classData.startTime, $scope.classInfo.classData.endTime);
    $scope.discussionTime = formatTime($scope.classInfo.classData.discussion.days, $scope.classInfo.classData.discussion.startTime, $scope.classInfo.classData.discussion.endTime);

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
]);
