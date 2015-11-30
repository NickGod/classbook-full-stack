'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the classbookApp
 */
angular.module('classbookApp')
  .controller('HeaderCtrl', ['$rootScope', '$scope', '$location','AuthService',
    function ($rootScope, $scope, $location, AuthService) {
    $scope.auth = AuthService;

    $scope.onSignUpButtonClick = function() {
      $rootScope.$broadcast("HeaderCtrl:SignUpButtonClickedEvent", {});
    };

    $scope.onSignInButtonClick = function() {
      $rootScope.$broadcast("HeaderCtrl:SignInButtonClickedEvent", {});
    };

    $scope.onSignOutButtonClick = function() {
      $rootScope.classes = null;
      $rootScope.events = null;
      $rootScope.eventSources = null;
      AuthService.logout().then(function() {
        $location.path('/');
      });
    };
  }]);
