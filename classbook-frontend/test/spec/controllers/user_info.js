'use strict';

describe('Controller: UserInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('classbookApp'));

  var UserInfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserInfoCtrl = $controller('UserInfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserInfoCtrl.awesomeThings.length).toBe(3);
  });
});
