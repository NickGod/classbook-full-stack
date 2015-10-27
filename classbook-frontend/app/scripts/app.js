'use strict';

/**
 * @ngdoc overview
 * @name classbookApp
 * @description
 * # classbookApp
 *
 * Main module of the application.
 */
angular
  .module('classbookApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ng-token-auth'
  ])
  .constant('FRONTEND_MOCKING', false)
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/groups', {
        templateUrl: 'views/groups.html',
        controller: 'GroupsCtrl',
        controllerAs: 'groups'
      })
      .when('/user_info', {
        templateUrl: 'views/user_info.html',
        controller: 'UserInfoCtrl',
        controllerAs: 'userInfo'
      })
      .when('/class_info', {
        templateUrl: 'views/class_info.html',
        controller: 'ClassInfoCtrl',
        controllerAs: 'classInfo'
      })
      .when('/class_swapping', {
        templateUrl: 'views/class_swapping.html',
        controller: 'ClassSwappingCtrl',
        controllerAs: 'classSwapping'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function($authProvider) {
    $authProvider.configure({
      apiUrl: 'api/user'
    });
  });
