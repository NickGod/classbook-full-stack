'use strict';

describe('Controller: ClassSwappingCtrl', function () {

  // load the controller's module
  beforeEach(module('classbookApp'));

  var ClassSwappingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClassSwappingCtrl = $controller('ClassSwappingCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ClassSwappingCtrl.awesomeThings.length).toBe(3);
  });
});
