'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:ClassInfoCtrl
 * @description
 * # ClassInfoCtrl
 * Controller of the classbookApp
 */

/**
 * Note to Shuo:
 * You need to change the program to an asynchronous style,
 * because getEventData(), in reality, will not immediately return.
 *
 * Now you may inject the service 'AuthService' and call AuthService.currentUser()
 * to get the object for the current user. The structure of the User object is:
 * {
 *   uid: String // user id.
 *   email: String // user email.
 *   getAllEnrolledClasses: void -> Promise // this method returns an Angular Promise.
 *                                           On success it will pass the list you want
 *                                           to your handler; on failure, it will pass
 *                                           whatever response from the server to your
 *                                           handler.
 * }
 *
 * Example usage of a Promise:
 * user.getAllEnrolledClasses().then(function(list) {...}) // success handler
 *                             .catch(function(resp) {...}) // error handler
 *
 * xih
 */

angular.module('classbookApp')
  .controller('ClassCldrCtrl', ['$scope', '$compile', 'uiCalendarConfig', 'AuthService', function($scope, $compile, uiCalendarConfig, AuthService) {

    function getEventData() {
      return [
        {className: 'CS 130', startTime: '10:00:00', endTime: '11:50:00', days: [1, 3]},
        {className: 'CS 145', startTime: '10:00:00', endTime: '11:50:00', days: [2, 4]},
        {className: 'ECON 106V', startTime: '13:00:00', endTime: '14:15:00', days: [2, 4]},
        {className: 'HIST 1C', startTime: '14:00:00', endTime: '15:00:00', days: [1, 3, 5]},
        {className: 'MGMT 120A', startTime: '08:00:00', endTime: '09:00:00', days: [1, 3, 5]},
      ];
    }
    
    var quarterBegins = new Date('2015-09-22');
    var quarterEnds = new Date('2015-12-12');
    
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
    
    /* event source that pulls from url */
    $scope.eventSource = {};

    /* event source that contains custom events on the scope */
    $scope.events = [];

    function getEvents() {
      var user = AuthService.currentUser();
      
      user.getAllEnrolledClasses().then(function(resp) {
        var data = resp.data;
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
        
        var events = parseData(resp.data);
        $scope.events.push.apply($scope.events, events);
      })
      .catch(function(resp) {
        alert("Error in getting user data!");
      });
      
    }

    /* alert on eventClick */
    $scope.alertOnEventClick = function(course, jsEvent, view){
        $scope.alertMessage = (course.title + ': info... ');
    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };

    /* add custom event*/
    $scope.addEvent = function() {
      return;
    };
    /* remove event */
    $scope.remove = function(index) {
      // console.log(index.name);
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };
     /* Render Tooltip */
    $scope.eventRender = function(event, element, view) {
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };

    $scope.addClass = function(course) {
      alert('Class ' + course.name + ' and discussion ' + course.dis.name + ' have been added');
      var newEvents = [];
      var days = [];
      if (course.mon) {
        days.push(1);
      }
      if (course.tue) {
        days.push(2);
      }
      if (course.wed) {
        days.push(3);
      }
      if (course.thur) {
        days.push(4);
      }
      if (course.fri) {
        days.push(5);
      }
      
      newEvents.push({
        className: course.name,
        startTime: course.start,
        endTime: course.end,
        days: days,
      });
      
      var disDays = [];
      if (course.dis.mon) {
        disDays.push(1);
      }
      if (course.dis.tue) {
        disDays.push(2);
      }
      if (course.dis.wed) {
        disDays.push(3);
      }
      if (course.dis.thur) {
        disDays.push(4);
      }
      if (course.dis.fri) {
        disDays.push(5);
      }
      
      newEvents.push({
        className: course.dis.name,
        startTime: course.dis.start,
        endTime: course.dis.end,
        days: disDays,
      });
      
      var events = parseData(newEvents);
      $scope.events.push.apply($scope.events, events);
    };

    $scope.test = function() {
      alert('test function called');
    };
    
    $scope.viewRender = function(view, element) {
      // $('#calendar').fullCalendar('updateEvent', $scope.events);
    };

    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 600,
        editable: true,
        header: {
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        defaultView: 'agendaWeek',
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender,
      }
    };

    $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource];

    getEvents();
  }
]);
