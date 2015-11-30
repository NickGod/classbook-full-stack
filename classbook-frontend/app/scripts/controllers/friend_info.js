'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:FriendInfoCtrl
 * @description
 * # UserInfoCtrl
 * Controller of the classbookApp
 */

angular.module('classbookApp')
  .controller('FriendInfoCtrl', ['$scope', '$rootScope', 'AuthService', 'SearchService', function($scope,  $rootScope, AuthService, SearchService) {

    $scope.$watch(AuthService.isAuthenticated, function(isAuthenticated) {
      $scope.isAuthenticated = isAuthenticated;
      if ($scope.isAuthenticated) {
        $scope.currentUser = AuthService.currentUser();

        $scope.currentUser.getFriendInfo().then(function(info) {
          $scope.user = info;
        }).catch(function(e) {
          console.log("ERROR: " + e);
        });
      }
    });

    // SearchService.getUserById($rootScope.fid).then(function(resp){
   	//   $scope.user = resp;
   	//   console.log("Friend info")
    // 	console.log(resp);
    // }).catch(function(resp) {
    //   console.log("Error in getting user information");
    // });

     $scope.getFriends = function() {
       if ($scope.friendGotten) {
         return;
       }
       
       $scope.currentUser.getFriendFriends($scope.user.id).then(function(friends) {
         $scope.friends = friends;
       }).catch(function(e) {
         console.log("ERROR: " + e);
       });

       $scope.friendGotten = true;
    }




  }]);