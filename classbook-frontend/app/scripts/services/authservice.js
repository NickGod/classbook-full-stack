'use strict';

/**
 * @ngdoc service
 * @name classbookApp.AuthService
 * @author Xi Han (xihan94@ucla.edu)
 * @description
 * # AuthService
 * Service in the classbookApp.
 */
angular.module('classbookApp')
  .service('AuthService', ['$q', '$auth', 'FRONTEND_MOCKING', function ($q, $auth, FRONTEND_MOCKING) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    console.log(FRONTEND_MOCKING);
    if (!FRONTEND_MOCKING) {
      var _currentUser = null;
      return {

        /**
         * Determine whether there is a user currently signed in.
         *
         * @returns {Boolean} True if a user is currently signed in.
         */
        isAuthenticated: function () {
          return !!_currentUser;
        },

        /**
         * Get the object for current user.
         * @returns {Object} The object representing the signed in user,
         *                   null if no user is currently signed in.
         */
        currentUser: function() {
          return _currentUser;
        },

        /**
         * Log in with username and password.
         *
         * @param {String} [username] Username.
         * @param {String} [password] Password in plain text.
         * @returns {Promise} A $http promise that will be resolved or
         *                    rejected by the server. The JSON returned
         *                    by the server will be passed to
         *                    the handlers.
         */
        login: function(username, password) {
          return $auth.submitLogin({ email: username, password: password })
            .then(function(user) {
              _currentUser = user;
            });
        },

        /**
         * Log out.
         *
         * @returns {Promise} A $http promise that will be resolved or
         *                    rejected by the server. The JSON returned
         *                    by the server will be passed to
         *                    the handlers.
         */
        logout: function () {
          return $auth.signOut()
            .then(function() {
              _currentUser = null;
            });
        },

        /**
         * Sign up with parameters stored in a dictionary. The entry "email",
         * "password" and "password_confirmation" must be present.
         *
         * @param {Object} [params] The dictionary containing the user's data
         *                          for registration.
         *
         * @returns {Promise} A $http promise that will be resolved or
         *                    rejected by the server. The JSON returned
         *                    by the server will be passed to
         *                    the handlers.
         */
        register: function(params) {
          return $auth.submitRegistration(params)
            .then(function(user) {
              _currentUser = user;
            });
        }
      };
    } else {
      return {
        isAuthenticated: function () {
          return true;
        },

        currentUser: function() {
          return {username: "xihan94"};
        },

        login: function(username, password) {
          _currentUser = {
            username: username,
            password: password
          };
          return $q.when(_currentUser);
        },

        logout: function () {
          _currentUser = null;
          return $q.when(_currentUser);
        },

        register: function(params) {
          return this.login(params.username, params.password);
        }
      };
    }
  }]);
