'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:ClassSwappingCtrl
 * @description
 * # ClassSwappingCtrl
 * Controller of the classbookApp
 */
angular.module('classbookApp')
  .controller('ClassSwappingCtrl', ['$scope', '$modal', '$rootScope', 'AuthService', 'SearchService',
  function ($scope, $modal, $rootScope, AuthService, SearchService) {

    $scope.requestInfos = [];
    $scope.messages = [];
    // $rootScope.currentUser = AuthService.currentUser();
    $scope.$watch(AuthService.isAuthenticated, function (isAuthenticated) {
      $scope.isAuthenticated = isAuthenticated;
      if ($scope.isAuthenticated) {
        $scope.user = AuthService.currentUser();
        getRequestInfos();

      }
    });

    $scope.tab1 = true;
    $scope.tab2 = false;
    $scope.tab3 = false;


    function getRequestInfos() {
      $scope.user.getAllSwapRequests().then(function (messages) {
        $scope.messages = messages;

        $scope.messages.forEach(function (message, i) {
          var duplicate = false;
          var requestInfo = { user_email: "", has_dis_name: "", want_dis_name: "" };
          //fill the request info
          SearchService.getUserById(message.uid).then(function (user) {
            requestInfo.user_email = user.email;
            SearchService.getDiscussionById(message.has_dis).then(function (dis) {
              requestInfo.has_dis_name = dis[0].className;
              SearchService.getDiscussionById(message.want_dis).then(function (dis) {
                requestInfo.want_dis_name = dis[0].className;
                for (var r in $scope.requestInfos) {
                  if (requestInfo == $scope.requestInfos[r]) {
                    duplicate = true;
                  }
                }
                if (duplicate == false)
                  $scope.requestInfos.push(requestInfo);
              })

            })
          });
        });

      });
      // MODAL WINDOW
    }

    $scope.open = function (_course) {

      var modalInstance = $modal.open({
        controller: "ModalInstanceCtrl",
        templateUrl: 'modal_swap.html',
        resolve: {
          course: function () {
            console.log("Swap window:");
            console.log(_course);
            return _course;
          }
        }
      });

    };

    $scope.chooseTab = function (index) {
      switch (index) {
        case 1:
          $scope.tab1 = true;
          $scope.tab2 = false;
          $scope.tab3 = false;
          break;
        case 2:
          $scope.tab1 = false;
          $scope.tab2 = true;
          $scope.tab3 = false;
          break;
        case 3:
          $scope.tab1 = false;
          $scope.tab2 = false;
          $scope.tab3 = true;
          break;

        default:
          break;

      }
    }

    $scope.vm = {};

    $scope.vm.messages = [
      {
        'username': 'username1',
        'content': 'Hi!'
      },
      {
        'username': 'username2',
        'content': 'Hello!'
      },
      {
        'username': 'username2',
        'content': 'Hello!'
      },
      {
        'username': 'username2',
        'content': 'Hello!'
      },
      {
        'username': 'username2',
        'content': 'Hello!'
      },
      {
        'username': 'username2',
        'content': 'Hello!'
      }
    ];

    $scope.vm.username = 'username1';

    $scope.vm.sendMessage = function (message, username) {
      if (message && message !== '' && username) {
        $scope.vm.messages.push({
          'username': username,
          'content': message
        });
      }
    };
    $scope.vm.visible = true;
    $scope.vm.expandOnNew = true;


  }])
  .controller('ModalInstanceCtrl', ['$rootScope', '$scope', '$modalInstance', 'course', 'SwapRequest',
  function ($rootScope, $scope, $modalInstance, course, SwapRequest) {
    // $scope.course = course;
    // alert($scope.course);
    // alert(course);
    $scope.course = course;
    $scope.classes = $rootScope.classes;
    console.log($scope.classes);
    console.log($scope.course);


    //send a post request to backend to create swap request
    // $scope.swapFor = function(course)
    // sendSwapRequest: function() {

    //   return $http.post('/api/swap_request/create', {userid: this.uid, has_dis: this.has_dis, want_dis: this.want_dis});

    // }

    // console.log($scope.user);
    $scope.SwapForClass = function (enrolledClassId) {
      console.log(enrolledClassId);
      // console.log($scope.user);
      $scope.swaprequest = new SwapRequest($scope.user.id, enrolledClassId, $scope.course.discussionId);
      alert('Swap request sent!');
      $scope.swaprequest.sendSwapRequest().then(function (res) {
        console.log(res);
      })

    }

  }
  ]);
