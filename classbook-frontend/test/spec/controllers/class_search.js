'use strict';

describe('Controller: ClassSearchCtrl', function () {

  // load the controller's module
  beforeEach(module('classbookApp'));

  var ClassSearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClassSearchCtrl = $controller('ClassSearchCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ClassSearchCtrl.awesomeThings.length).toBe(3);
  });
});
