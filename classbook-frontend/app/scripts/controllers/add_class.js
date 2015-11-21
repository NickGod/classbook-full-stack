'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:AddClassCtrl
 * @description
 * # AddClassCtrl
 * Controller of the classbookApp
 */
angular.module('classbookApp')
  .controller('AddClassCtrl', ['$scope', 'SearchService', '$compile', 'uiCalendarConfig', 'AuthService', 'User',
  function ($scope, SearchService, $compile, uiCalendarConfig, AuthService, User) {

    $scope.tab = 1;

    // CONTROLLER for search
    $scope.searchResults = [];

    $scope.user = AuthService.currentUser();
    // User.uid = $scope.user.uid;
    // User.email = $scope.user.email;

    // console.log("controller loaded");
    // console.log(User);

    //helper function
    function parseData(cls) {
      var events = [];
      var date;
      var data = [cls];
      console.log(data);
      for(date = new Date(quarterBegins.getTime()); date < quarterEnds; date.setDate(date.getDate() + 1)) {
        var course, i;
        for (i = 0; i < data.length; i++) {
          course = data[i];
          console.log(course);

          //TODO: DAY PARSING
          // if (course.days.indexOf(date.getDay()) != -1) {
          //   var timeBegin = date.toDateString() + ' ' + course.startTime;
          //   var timeEnd = date.toDateString() + ' ' + course.endTime;

          //   events.push({
          //     title: course.className,
          //     start: new Date(timeBegin),
          //     end: new Date(timeEnd),
          //     allDay: false,
          //     editable: false,
          //     stick: true,
          //   });
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
          classes.push(clsDis);
        }
      }

      return classes;
    }

    $scope.searchClass = function(course) {
      if (!course) {
        window.alert("You didn't fill in anything yet");
        return;
      }

      SearchService.searchClasses(course).then(function(classes) {
        // var data = resp.data;
        if (!classes){
          throw new Error('Cannot get the classes object back');
        }
        $scope.searchResults = parseSearchData(classes);
      })
      .catch(function(e) {
        if(e)
          console.log(e);
        // alert("Error in searching classes!\n" + e);
      });

      // $scope.searchResults = [
      //   {
      //     id: 102,
      //     className: "ART 10",
      //     lectureTime: "MWF 10:00am-10:50am",
      //     discussion: "1A",
      //     discussionTime: "T 2:00pm-2:50pm",
      //   },
      //   {
      //     id: 211,
      //     className: "CS 130",
      //     lectureTime: "MW 12:00pm-1:50pm",
      //     discussion: "1B",
      //     discussionTime: "F 10:00am-11:50am",
      //   }
      // ];
    };

    $scope.enroll = function(course) {
      $scope.user.enroll(course.discussionId).then(function(res) {
        console.log(res);
        if(res.status != '200')
          throw new Error('Enroll failed');

        console.log(course);
        // var calData = course.concat(course.discussions);

        var events = parseData(course);
        console.log(events);
        $scope.events.push.apply($scope.events, events);
        console.log($scope.events);
        alert("Enrolled! " + course.lectureId + ' ' + course.discussionId);

        //remove the corresponding class from the view
        for (var i = 0; i < $scope.searchResults.length; i++) {
          if($scope.searchResults[i] == course)
          {
            //note 
            //if we splice the array inside the for loop
            //there might be problem with it (boundary)
            alert('Found the right class to remove');
            $scope.searchResults.splice(i, 1);
            break;
          }
        }
      }).catch(function(e) {
        if(e) {console.log('Error when enrolling: ' + e)};
      });
    }



    // CONTROLLER for calendar
    var quarterBegins = new Date('2015-09-22');
    var quarterEnds = new Date('2015-12-12');




    /* event source that pulls from url */
    $scope.eventSource = {};

    /* event source that contains custom events on the scope */
    $scope.events = [];

    //save user to the scope
    // $scope.user = AuthService.currentUser();

    //get events when calendar is loaded
    function getEvents() {
      console.log($scope.user);
      $scope.user.getAllEnrolledClasses().then(function(classes) {
        if (!classes)
        {
          throw new Error('The response is NULL ');
        }

        // console.log(classes);
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

        // var events = parseData(classes);
        // $scope.events.push.apply($scope.events, events);
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
        $scope.user = AuthService.currentUser();
   });

   /* watch for scope events */
   $scope.$watch('events', function() {
      console.log($scope.events);
      $scope.eventSources = [$scope.events, $scope.eventSource];
   })
  }

]);
