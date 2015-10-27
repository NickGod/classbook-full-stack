'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the classbookApp
 */
angular.module('classbookApp')
  .controller('HeaderCtrl', ['$rootScope', '$scope', 'AuthService', function ($rootScope, $scope, AuthService) {
    $scope.auth = AuthService;

    $scope.onSignUpButtonClick = function() {
      $rootScope.$broadcast("HeaderCtrl:SignUpButtonClickedEvent", {});
    };

    $scope.onSignInButtonClick = function() {
      $rootScope.$broadcast("HeaderCtrl:SignInButtonClickedEvent", {});
    };
  }]);
