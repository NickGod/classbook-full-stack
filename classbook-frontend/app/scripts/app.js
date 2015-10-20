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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
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
      .otherwise({
        redirectTo: '/'
      });
  });
