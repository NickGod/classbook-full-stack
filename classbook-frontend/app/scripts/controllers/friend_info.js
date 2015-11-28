'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:FriendInfoCtrl
 * @description
 * # UserInfoCtrl
 * Controller of the classbookApp
 */

angular.module('classbookApp')
  .controller('FriendInfoCtrl', ['$scope', '$rootScope','SearchService',function ($scope,  $rootScope, SearchService) {
  	
   SearchService.getUserById($rootScope.fid, $rootScope.femail).then(function(resp){
   	$scope.user = resp;
   	console.log("Friend info")
   	console.log(resp);
   }).catch(function(resp) {
       alert("Error in getting user information");
     });

    //  $scope.getFriends = function() {
    //   $scope.user.getFriends().then(function(friends) {
    //     console.log("Friends:");
    //     console.log(friends);
    //     $scope.friends = friends;
    //   }).catch(function(e) {
    //     console.log("ERROR: " + e);
    //   });
    // }




  }]);