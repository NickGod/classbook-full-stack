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
    '$scope', 'SearchService', '$rootScope', 'AuthService',
    function($scope, SearchService, $rootScope, AuthService) {
      // var quarterBegins = new Date('2015-09-22');
      // var quarterEnds = new Date('2015-12-12');
      if (!$rootScope.currentUser)
        $scope.currentUser = AuthService.currentUser();

      $scope.currentUser = $rootScope.currentUser;
      $scope.classes = $rootScope.classes;
      console.log($scope.classes);
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

      $scope.searchClass = function(course) {
        if (!course) {
          window.alert("You didn't fill in anything yet");
          return;
        } else if (!course.className && !course.department) {
          window.alert("Please enter at least one of class name or department name");
          return;
        }

        // Sample Search Result:
        //
        // {
        //   id: 102,
        //   className: "ART 10",
        //   lectureTime: "MWF 10:00am-10:50am",
        //   discussion: "1A",
        //   discussionTime: "T 2:00pm-2:50pm",
        // }

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


      $scope.enroll = function(lectureId, discussionId) {
        window.alert("CLICKED!" + lectureId + ' ' + discussionId);
      }
    }
  ]
);
