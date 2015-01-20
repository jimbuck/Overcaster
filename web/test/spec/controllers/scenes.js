'use strict';

describe('Controller: ScenesCtrl', function () {

  // load the controller's module
  beforeEach(module('overcasterControllers'));

  var ScenesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScenesCtrl = $controller('ScenesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of scenes to the scope', function () {
    expect(scope.scenes.length).toBe(7);
  });
});
