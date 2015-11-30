'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:ClassSearchCtrl
 * @description
 * # ClassSearchCtrl
 * Controller of the classbookApp
 */
angular.module('classbookApp')
  .controller('ClassSearchCtrl', [
    '$scope', 'SearchService', '$rootScope', 'AuthService', '$uibModal',
    function($scope, SearchService, $rootScope, AuthService, $uibModal) {
      $scope.$watch( AuthService.isAuthenticated, function ( isAuthenticated ) {
        $scope.isAuthenticated = isAuthenticated;
        if ($scope.isAuthenticated)
        {
          $scope.user = AuthService.currentUser();
          // getEvents();
        }
      });
      
      $rootScope.$watch('classes', function(classes) {
        console.log("Root classes");
        console.log(classes);
        if (classes != null)
        {
          $scope.classes = classes;
        }
      })

      $scope.currentUser = $rootScope.currentUser;
      console.log($rootScope.currentUser);
      $scope.searchResults = [];

      // Helper function used for creating formatted time string
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

        time += ' ' + startTime + '-' + endTime;

        return time;
      }

    function parseSearchData(data) {
      var classes = [];
      var i, j;

      for(i = 0; i < data.length; i++) {
        var clsData = data[i];
        var time = formatTime(clsData.days, clsData.startTime, clsData.endTime);

        var cls = {
          lectureId: clsData.lectureId,
          className: clsData.className,
          lectureTime: time,
        };

        for(j = 0; j < clsData.discussions.length; j++) {
          var dis = clsData.discussions[j];
          var clsDis = JSON.parse(JSON.stringify(cls));

          clsDis.discussionId = dis.discussionId;
          clsDis.discussionName = dis.discussionName;
          clsDis.discussionTime = formatTime(dis.days, dis.startTime, dis.endTime);

          var rawData = JSON.parse(JSON.stringify(clsData));
          delete rawData.discussions;
          rawData.discussion = dis;
          clsDis.rawData = rawData;
          classes.push(clsDis);
        }
      }

      return classes;
    }

    $scope.searchClass = function(course) {
      if (!course) {
        $uibModal.open({
          templateUrl: 'views/message_box.html',
          controller: 'MessageBoxCtrl',
          resolve: {
            items: function() {
              return {
                title: 'Oops!',
                message: "You didn't fill in anything yet",
                isMessageOnly: true
              };
            }
          }
        });
        return;
      } else if (!course.className && !course.department) {
        $uibModal.open({
          templateUrl: 'views/message_box.html',
          controller: 'MessageBoxCtrl',
          resolve: {
            items: function() {
              return {
                title: 'Oops!',
                message: "Please enter at least one of class name or department name",
                isMessageOnly: true
              };
            }
          }
        });
        return;
      }

      SearchService.searchClasses(course).then(function(classes) {
        if (!classes) {
          throw new Error('Cannot get the classes object back');
        } else if (classes.length == 0) {
          $uibModal.open({
            templateUrl: 'views/message_box.html',
            controller: 'MessageBoxCtrl',
            resolve: {
              items: function() {
                return {
                  title: 'Oops!',
                  message: 'There is no class matching your provided information.',
                  isMessageOnly: true
                };
              }
            }
          });
        } else {
          $scope.searchResults = parseSearchData(classes);
        }
      })
      .catch(function(e) {
        if(e)
          console.log(e);
      });
    }
  }
  ]);
