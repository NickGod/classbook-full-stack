'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:ClassSearchCtrl
 * @description
 * # ClassSearchCtrl
 * Controller of the classbookApp
 */
angular.module('classbookApp')
  .controller('ClassSearchCtrl', ['$scope', function($scope) {
    var quarterBegins = new Date('2015-09-22');
    var quarterEnds = new Date('2015-12-12');
    
    $scope.searchResults = [];
    
    function parseData(data) {
      var events = [];
      var date;

      for(date = new Date(quarterBegins.getTime()); date < quarterEnds; date.setDate(date.getDate() + 1)) {
        var course, i;
        for (i = 0; i < data.length; i++) {
          course = data[i];
          if (course.days.indexOf(date.getDay()) != -1) {
            var timeBegin = date.toDateString() + ' ' + course.startTime;
            var timeEnd = date.toDateString() + ' ' + course.endTime;

            events.push({
              title: course.className,
              start: new Date(timeBegin),
              end: new Date(timeEnd),
              allDay: false,
              editable: false,
              stick: true,
            });
          }
        }
      }
      
      return events;
    }
    
    $scope.searchClass = function(course) {
      if (!course.name && !course.department) {
        window.alert("Please enter at least one of class name or department name");
        return;
      }
      
      // TODO: Replace below with class search API
      $scope.searchResults = [
        {
          id: 102,
          className: "ART 10",
          lectureTime: "MWF 10:00am-10:50am",
          discussion: "1A",
          discussionTime: "T 2:00pm-2:50pm",
        },
        {
          id: 211,
          className: "CS 130",
          lectureTime: "MW 12:pm-1:50pm",
          discussion: "1B",
          discussionTime: "F 10:00am-11:50am",
        }
      ];
    };

    $scope.enroll = function(id, dis) {
      window.alert("CLICKED!" + id + ' ' + dis);
    }
  }
]);
