'use strict';

describe('Controller: ElementsCtrl', function () {

  // load the controller's module
  beforeEach(module('overcasterApp'));

  var ElementsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ElementsCtrl = $controller('ElementsCtrl', {
      $scope: scope
    });
    scope.$apply();
  }));

  it('should attach a list of elements to the scope', function () {
    expect(scope.elements.length).toBeGreaterThan(0);
  });
});
