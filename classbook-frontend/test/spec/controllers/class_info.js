'use strict';

describe('Controller: ClassInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('classbookApp'));

  var ClassInfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClassInfoCtrl = $controller('ClassInfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ClassInfoCtrl.awesomeThings.length).toBe(3);
  });
});
