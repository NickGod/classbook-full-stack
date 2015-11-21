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
  .controller('ClassCldrCtrl', ['$scope', '$compile', 'uiCalendarConfig', 'AuthService',
  function($scope, $compile, uiCalendarConfig, AuthService) {

    var quarterBegins = new Date('2015-09-22');
    var quarterEnds = new Date('2015-12-12');


    //helper function
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

    //save user to the scope
    $scope.user = AuthService.currentUser();

    //get events when calendar is loaded
    function getEvents() {
      console.log($scope.user);
      $scope.user.getAllEnrolledClasses().then(function(classes) {
        if (!classes)
        {
          throw new Error('The response is NULL ');
        }

        console.log(classes);
        // var data = resp.data;
        var events = [];
        var date;

        for(date = new Date(quarterBegins.getTime()); date < quarterEnds; date.setDate(date.getDate() + 1)) {
          var course, i;
          for (i = 0; i < classes.length; i++) {
            course = classes[i];
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

        var events = parseData(classes);
        $scope.events.push.apply($scope.events, events);
      })
      .catch(function(e) {
        if (e)
          console.log(e);
        // alert("Error in getting user data!");
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


    /* watch for user */
   $scope.$watch('user', function() {
      console.log('user loaded');
      if ($scope.user != null)
        getEvents();
      else
        console.log('User is invalid');
   });
  }
]);
