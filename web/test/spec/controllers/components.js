'use strict';

describe('Controller: ComponentsCtrl', function () {

  // load the controller's module
  beforeEach(module('overcasterControllers'));

  var ComponentsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComponentsCtrl = $controller('ComponentsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
