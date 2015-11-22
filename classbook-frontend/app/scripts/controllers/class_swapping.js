'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:ClassSwappingCtrl
 * @description
 * # ClassSwappingCtrl
 * Controller of the classbookApp
 */
angular.module('classbookApp')
  .controller('ClassSwappingCtrl', ['$scope', '$modal', '$rootScope', 'AuthService', function ($scope, $modal, $rootScope, AuthService) {
  		
  		$rootScope.currentUser = AuthService.currentUser();
  		

  		$scope.tab1 = true;
  		$scope.tab2 = false;
  		$scope.tab3 = false;

  		    // MODAL WINDOW
	    $scope.open = function (_course) {

	        var modalInstance = $modal.open({
	          controller: "ModalInstanceCtrl",
	          templateUrl: 'modal_swap.html',
	            resolve: {
	                course: function()
	                {

	                    return _course;
	                }
	            }
	             });

	    };

  		$scope.chooseTab = function (index) {
  			switch (index) {
  				case 1:
  				  	$scope.tab1 = true;
			  		$scope.tab2 = false;
			  		$scope.tab3 = false;
			  		break;
  				case 2:
   				  	$scope.tab1 = false;
			  		$scope.tab2 = true;
			  		$scope.tab3 = false;
			  		break;
  				case 3:
   				  	$scope.tab1 = false;
			  		$scope.tab2 = false;
			  		$scope.tab3 = true;
			  		break;

			  	default:
			  		break;

  			}
  		}

		$scope.vm = {};

		$scope.vm.messages = [
			{
			'username': 'username1',
			'content': 'Hi!'
			},
			{
			'username': 'username2',
			'content': 'Hello!'
			},
			{
			'username': 'username2',
			'content': 'Hello!'
			},
			{
			'username': 'username2',
			'content': 'Hello!'
			},
			{
			'username': 'username2',
			'content': 'Hello!'
			},
			{
			'username': 'username2',
			'content': 'Hello!'
			}
		];

		$scope.vm.username = 'username1';

		$scope.vm.sendMessage = function(message, username) {
		if(message && message !== '' && username) {
			$scope.vm.messages.push({
			'username': username,
			'content': message
			});
		}
		};
		$scope.vm.visible = true;
		$scope.vm.expandOnNew = true;


  }])
.controller('ModalInstanceCtrl',  ['$scope', '$modalInstance', 'course',  function ($scope, $modalInstance, course) {
	// $scope.course = course;
	// alert($scope.course);
	// alert(course);
	$scope.course = course;


}]);
