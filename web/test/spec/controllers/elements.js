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
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
