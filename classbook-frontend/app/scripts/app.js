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
    'ng-token-auth',
    'ui.calendar',
    'irontec.simpleChat',
    'ui.bootstrap'
  ])
  .constant('FRONTEND_MOCKING', false)
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        requireLogin: false
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/groups', {
        templateUrl: 'views/groups.html',
        controller: 'GroupsCtrl',
        controllerAs: 'groups',
        requireLogin: true
      })
      .when('/user_info', {
        templateUrl: 'views/user_info.html',
        controller: 'UserInfoCtrl',
        controllerAs: 'userInfo',
        requireLogin: true
      })
      .when('/class_swapping', {
        templateUrl: 'views/class_swapping.html',
        controller: 'ClassSwappingCtrl',
        controllerAs: 'classSwapping',
        requireLogin: true
      })
      .when('/class_info', {
        templateUrl: 'views/class_info.html',
        controller: 'ClassInfoCtrl',
        controllerAs: 'classInfo',
        requireLogin: true
      })
      .when('/add_class', {
        templateUrl: 'views/add_class.html',
        controller: 'AddClassCtrl',
        controllerAs: 'addClass',
        requireLogin: true
      })
      .otherwise({
        redirectTo: '/'
      });
  })
   .config(function($authProvider) {
     $authProvider.configure({
       apiUrl: 'api/user',
       validateOnPageLoad: false
     });
   })
   .run(['$rootScope', '$location', "AuthService", function($rootScope, $location, AuthService) {
     $rootScope.$on("$routeChangeStart", function(event, next, current) {
       if(next.requireLogin) {
         // Auth/session check here
         if (!AuthService.isAuthenticated()) {
           AuthService.validateUser().then(function() {})
             .catch(function() {
               event.preventDefault();
               console.log();
               $location.path('/');
             })
         }
       }
     });
   }]);
