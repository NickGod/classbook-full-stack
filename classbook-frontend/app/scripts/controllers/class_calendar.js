'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:ClassInfoCtrl
 * @description
 * # ClassInfoCtrl
 * Controller of the classbookApp
 */

angular.module('classbookApp')
  .controller('ClassCldrCtrl', ['$rootScope', '$scope', '$compile', 'uiCalendarConfig', 'AuthService',
  function($rootScope, $scope, $compile, uiCalendarConfig, AuthService) {

    //get current user only when auth service tells you that you have it
    $scope.$watch(AuthService.isAuthenticated, function(isAuthenticated) {
      $scope.isAuthenticated = isAuthenticated;
      if ($scope.isAuthenticated) {
        $scope.user = AuthService.currentUser();
        getEvents();
      }
    });

    $scope.$watch('events', function(newValue, oldValue) {
      $scope.eventSources = [newValue, $scope.eventSource];
    });

    var quarterBegins = new Date('2015-09-22');
    var quarterEnds = new Date('2015-12-12');

    //helper function
    function parseCalendarDetailData(data) {
      var events = [];
      var date;
      var course, i;

      for(date = new Date(quarterBegins.getTime()); date < quarterEnds; date.setDate(date.getDate() + 1)) {
        for (i = 0; i < data.length; i++) {
          course = data[i];
          if (course.days.indexOf(date.getDay()) != -1) {
            var timeBegin = date.toDateString() + ' ' + course.startTime;
            var timeEnd = date.toDateString() + ' ' + course.endTime;

            events.push({
              lectureId: course.lectureId,
              discussionId: course.discussion.discussionId,
              classData: course,
              title: course.className,
              start: new Date(timeBegin),
              end: new Date(timeEnd),
              allDay: false,
              editable: false,
              stick: true,
            });
          }

          if (course.discussion.days.indexOf(date.getDay()) != -1) {
            var timeBegin = date.toDateString() + ' ' + course.discussion.startTime;
            var timeEnd = date.toDateString() + ' ' + course.discussion.endTime;

            events.push({
              lectureId: course.lectureId,
              discussionId: course.discussion.discussionId,
              classData: course,
              title: course.className + ' Dis' + course.discussion.discussionName,
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

    // get events for calendar
    function getEvents() {
      if ($rootScope.classes && $rootScope.events) {
        $scope.classes = $rootScope.classes;
        $scope.events = $rootScope.events;
      } else {
        $scope.user.getEnrolledClassesDetail().then(function(classes) {
          if (!classes) {
            throw new Error('The response is NULL ');
          }
          $rootScope.classes = classes;
          $scope.classes = classes;

          var events = parseCalendarDetailData(classes);
          $scope.events.splice(0, $scope.events.length);
          $scope.events.push.apply($scope.events, events);
          $rootScope.events = $scope.events;
        })
        .catch(function(e) {
          if (e)
            console.log(e);
        });
      }
    }

    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view) {
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };

    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ) {
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };

    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key) {
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
  }
]);
