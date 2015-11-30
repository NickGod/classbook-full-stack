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
      modalInstance.result.then(
        function() {
          // $scope.searchResults = [];
        },
        function() {
          console.log("cancelled");
          // $scope.searchResults = [];
        }
      );
    };

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
  .controller('ModalInstanceCtrl', ['$rootScope', '$scope', '$uibModalInstance', '$uibModal', 'course', 'SwapRequest',
  function ($rootScope, $scope, $uibModalInstance, $uibModal, course, SwapRequest) {
    $scope.course = course;
    $scope.classes = $rootScope.classes;
    console.log($scope.classes);
    console.log($scope.course);
    $scope.SwapForClass = function (enrolledClassId) {
      console.log(enrolledClassId);

      $scope.swaprequest = new SwapRequest($scope.user.id, enrolledClassId, $scope.course.discussionId);
      $uibModal.open({
        templateUrl: 'views/message_box.html',
        controller: 'MessageBoxCtrl',
        resolve: {
          items: function() {
            return {
              title: 'Success',
              message: "Swap request sent",
              isMessageOnly: true
            };
          }
        }
      });
      $scope.swaprequest.sendSwapRequest().then(function (res) {
        console.log(res);
      })
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
  ]);
