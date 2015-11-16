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
    
    $scope.searchResults = [{className: "Class 1"}, {className: "Class 2"}];
    // $scope.searchResults = [];
    
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
      // alert('Class ' + course.name + ' and discussion ' + course.dis.name + ' have been added');
      // var newEvents = [];
      // var days = [];
      // if (course.mon) {
      //   days.push(1);
      // }
      // if (course.tue) {
      //   days.push(2);
      // }
      // if (course.wed) {
      //   days.push(3);
      // }
      // if (course.thur) {
      //   days.push(4);
      // }
      // if (course.fri) {
      //   days.push(5);
      // }
      
      // newEvents.push({
      //   className: course.name,
      //   startTime: course.start,
      //   endTime: course.end,
      //   days: days,
      // });
      
      // var disDays = [];
      // if (course.dis.mon) {
      //   disDays.push(1);
      // }
      // if (course.dis.tue) {
      //   disDays.push(2);
      // }
      // if (course.dis.wed) {
      //   disDays.push(3);
      // }
      // if (course.dis.thur) {
      //   disDays.push(4);
      // }
      // if (course.dis.fri) {
      //   disDays.push(5);
      // }
      
      // newEvents.push({
      //   className: course.dis.name,
      //   startTime: course.dis.start,
      //   endTime: course.dis.end,
      //   days: disDays,
      // });
      
      // var events = parseData(newEvents);
      // $scope.events.push.apply($scope.events, events);
    };

    $scope.test = function() {
      window.alert("CLICKED!");
    }

  }
]);
