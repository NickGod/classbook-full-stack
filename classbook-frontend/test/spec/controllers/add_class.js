'use strict';

describe('Controller: AddClassCtrl', function () {

  // load the controller's module
  beforeEach(module('classbookApp'));

  var AddClassCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddClassCtrl = $controller('AddClassCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddClassCtrl.awesomeThings.length).toBe(3);
  });
});
