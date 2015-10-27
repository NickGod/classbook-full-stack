'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the classbookApp
 */
angular.module('classbookApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.isFormSignUp = false;

    $scope.$on("HeaderCtrl:SignUpButtonClickedEvent", function(event, args) {
      console.log(event);
      $scope.isFormSignUp = true;
    });

    $scope.$on("HeaderCtrl:SignInButtonClickedEvent", function(event, args) {
      console.log(event);
      $scope.isFormSignUp = false;
    });
  }]);
