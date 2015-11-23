'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:AddClassCtrl
 * @description
 * # AddClassCtrl
 * Controller of the classbookApp
 */
angular.module('classbookApp')
  .controller('AddClassCtrl', ['$scope', 'SearchService', '$compile', 'uiCalendarConfig', 'AuthService', 'User', "$uibModal",
  function ($scope, SearchService, $compile, uiCalendarConfig, AuthService, User, $uibModal) {

    $scope.tab = 1;
    $scope.user = AuthService.currentUser();

    // CONTROLLER for calendar
    var quarterBegins = new Date('2015-09-22');
    var quarterEnds = new Date('2015-12-12');

    // helper function
    function parseCalendarData(data) {
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

    function parseCalendarDetailData(data) {
      var events = [];
      var date;
      console.log("DATA");
      console.log(data);
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

    $scope.enroll = function(course) {
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

        getEvents();
      }).catch(function(e) {
        if(e) {
          console.log('Error when enrolling: ' + e);
        }
      });
    }

    /* event source that pulls from url */
    $scope.eventSource = {};

    /* event source that contains custom events on the scope */
    $scope.events = [];

    // get events when calendar is loaded
    function getEvents() {
      $scope.user.getEnrolledClassesDetail().then(function(classes) {
        if (!classes) {
          throw new Error('The response is NULL ');
        }

        var events = parseCalendarDetailData(classes);
        $scope.events.splice(0, $scope.events.length);
        $scope.events.push.apply($scope.events, events);
      })
      .catch(function(e) {
        if (e)
          console.log(e);
        // alert("Error in getting user data!");
      });
    }

    $scope.open = function(course) {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/class_info.html',
        controller: 'ClassInfoCtrl',
        //size: size,
        resolve: {
          items: function () {
            return course;
          }
        }
      });
      modalInstance.result.then(function (disIdToDrop) {
        $scope.user.dropClass(disIdToDrop).then(function(resp){
          if (resp) {
            getEvents();
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
        $scope.user = AuthService.currentUser();
   });

   /* watch for scope events */
   $scope.$watch('events', function() {
      $scope.eventSources = [$scope.events, $scope.eventSource];
   });
  }
]);
