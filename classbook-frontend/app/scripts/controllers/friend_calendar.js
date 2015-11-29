'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:FriendCldrCtrl
 * @description
 * # FriendCldrCtrl
 * Controller of the classbookApp
 */

angular.module('classbookApp')
  .controller('FriendCldrCtrl', ['$scope', '$compile', 'uiCalendarConfig', 'AuthService',
  function($scope, $compile, uiCalendarConfig, AuthService) {

    $scope.$watch(AuthService.isAuthenticated, function(isAuthenticated) {
      $scope.isAuthenticated = isAuthenticated;
      if ($scope.isAuthenticated) {
        $scope.currentUser = AuthService.currentUser();
        getEvents();
      }
    });

    $scope.tab = 1;

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

    /* event source that contains custom events on the scope */
    $scope.events = [];
    $scope.eventSource = {};

    // get events for calendar
    function getEvents() {
      console.log("Friend get events");
      $scope.currentUser.getFriendEnrolledClassesDetail().then(function(classes) {
        if (!classes) {
          throw new Error('The response is NULL ');
        }
        $scope.classes = classes;

        var events = parseCalendarDetailData(classes);
        $scope.events.splice(0, $scope.events.length);
        $scope.events.push.apply($scope.events, events);
      })
      .catch(function(e) {
        if (e)
          console.log(e);
      });
    }

    $scope.addClass = function(course) {
      var newEvents = parseCalendarDetailData([course]);
      $scope.events.push.apply($scope.events, newEvents);
    };

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

    $scope.getViewName = function(calendar) {
      var calendar = uiCalendarConfig.calendars['classbookCal1'];
      if (calendar) {
        return calendar.fullCalendar('getView').name;
      } else {
        return 'none';
      }
    }

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
