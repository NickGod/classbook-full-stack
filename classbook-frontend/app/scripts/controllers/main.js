'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the classbookApp
 */
angular.module('classbookApp')
  .controller('MainCtrl', ['$location', '$scope', 'AuthService', function ($location, $scope, AuthService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.isFormSignUp = false;

    $scope.$on("HeaderCtrl:SignUpButtonClickedEvent", function(event, args) {
      $scope.isFormSignUp = true;
    });

    $scope.$on("HeaderCtrl:SignInButtonClickedEvent", function(event, args) {
      $scope.isFormSignUp = false;
    });

    $scope.signInForm = {
      email: "",
      password: ""
    };

    $scope.signUpForm = {
      email: "",
      password: "",
      password_confirmation: ""
    };

    $scope.signIn = function() {

      // Reset error states.
      $('#inputEmail-sign-in-form-group').removeClass('has-error');
      $('#inputPassword-sign-in-form-group').removeClass('has-error');

      // Validate the parameters.
      var valid = true;

      if (!isValidEmailAddress($scope.signInForm.email)) {
        valid = false;
        $('#inputEmail-sign-in-form-group').addClass('has-error');
      }

      // Send the request to server and handle the promise.
      // TODO: we can do better; add verbal explanation of the error.
      if (valid) {
        AuthService.login($scope.signInForm.email, $scope.signInForm.password)
          .then(function(resp) {
            $location.path('/user_info');
          })
          .catch(function(resp) {
            $('#inputEmail-sign-in-form-group').addClass('has-error');
            $('#inputPassword-sign-in-form-group').addClass('has-error');
        });
      }
    };

    $scope.signUp = function() {

      // Reset error states.
      $('#inputEmail-sign-up-form-group').removeClass('has-error');
      $('#inputPassword-sign-up-form-group').removeClass('has-error');
      $('#inputPasswordConfirmation-sign-up-form-group').removeClass('has-error');

      // Validate the parameters.
      var valid = true;

      if (!isValidEmailAddress($scope.signUpForm.email)) {
        valid = false;
        $('#inputEmail-sign-up-form-group').addClass('has-error');
      }

      if ($scope.signUpForm.password != $scope.signUpForm.password_confirmation) {
        valid = false;
        $('#inputPasswordConfirmation-sign-up-form-group').addClass('has-error');
      }

      // Send the request to server and handle the promise.
      // TODO: we can do better; add verbal explanation of the error.
      if (valid) {
        AuthService.register($scope.signUpForm)
          .then(function(user) {
            $location.path('/user_info');
          })
          .catch(function(resp) {
            $('#inputEmail-sign-up-form-group').addClass('has-error');
            $('#inputPassword-sign-up-form-group').addClass('has-error');
          });
      }
    }


  }]);


// TODO: move this to a utility service.
function isValidEmailAddress(emailAddress) {
  var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return pattern.test(emailAddress);
}
