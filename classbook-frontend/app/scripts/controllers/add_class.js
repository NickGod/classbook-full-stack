'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:AddClassCtrl
 * @description
 * # AddClassCtrl
 * Controller of the classbookApp
 */
angular.module('classbookApp')
  .controller('AddClassCtrl', ['$scope', 'SearchService', '$compile', 'uiCalendarConfig', 'AuthService', 'User', '$uibModal', '$rootScope',
  function ($scope, SearchService, $compile, uiCalendarConfig, AuthService, User, $uibModal, $rootScope) {

    $scope.tab = 1;

    $scope.$watch(AuthService.isAuthenticated, function(isAuthenticated) {
      $scope.isAuthenticated = isAuthenticated;
      if ($scope.isAuthenticated) {
        $scope.user = AuthService.currentUser();
      }
    });

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

      time += ' ' + startTime.substring(0, startTime.length - 3) + '-' + endTime.substring(0, startTime.length - 3);

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
          clsDis.rawData = [{
            className: clsDis.className,
            startTime: clsData.startTime,
            endTime: clsData.endTime,
            days: clsData.days
          }, {
            className: dis.discussionName,
            startTime: dis.startTime,
            endTime: dis.endTime,
            days: dis.days
          }];
          classes.push(clsDis);
        }
      }

      return classes;
    }

    $scope.searchResults = [];

    $scope.searchClass = function(course) {
      if (!course) {
        window.alert("You didn't fill in anything yet");
        return;
      } else if (!course.className && !course.department) {
        window.alert("Please enter at least one of class name or department name");
        return;
      }

      SearchService.searchClasses(course).then(function(classes) {
        if (!classes){
          throw new Error('Cannot get the classes object back');
        } else if (classes.length == 0) {
          alert("No matching class");
        } else {
          $scope.searchResults = parseSearchData(classes);
        }
      })
      .catch(function(e) {
        if(e)
          console.log("ERROR: " + e);
        // alert("Error in searching classes!\n" + e);
      });
    };

    $scope.enroll = function(course) {
      console.log(course);
      $scope.user.enroll(course.discussionId).then(function(res) {
        console.log("LOGGING: result from enroll()\n" + res);
        console.log(course);

        if(res.status != '200')
          throw new Error('Enroll failed');

        // alert("Enrolled! " + course.lectureId + ' ' + course.discussionId);

        // remove the corresponding class from the view
        var i = $scope.searchResults.indexOf(course);
        if (i > -1)
          $scope.searchResults.splice(i, 1);

        // TODO: getEvents();
        $scope.addClass(course);
      }).catch(function(e) {
        if(e) {
          console.log('Error when enrolling: ' + e);
        }
      });
    }

    $scope.open = function(course) {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/class_info.html',
        controller: 'ClassInfoCtrl',
        resolve: {
          items: function () {
            return course;
          }
        }
      });
      modalInstance.result.then(function (disIdToDrop) {
        $scope.user.dropClass(disIdToDrop).then(function(resp){
          if (resp) {
            // TODO: getEvents();
            // TODO: show alert window
            var i;
            console.log("DROP: ");
            for (i = $rootScope.events.length - 1; i >= 0; i--) {
              if ($rootScope.events[i].discussionId == disIdToDrop) {
                $rootScope.events.splice(i, 1);
              }
            }
          }
        }).catch(function(e){
          console.log("ERROR: ");
          console.log(e);
        });
      }, function () {
        console.log("Cancelled");
      });
    };

    /* alert on eventClick */
    $scope.alertOnEventClick = function(course, jsEvent, view){
      // $scope.alertMessage = (course.title + ': info... ');
      $scope.open(course);
    };
  }
]);
