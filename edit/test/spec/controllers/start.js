'use strict';

describe('Controller: StartCtrl', function () {

  // load the controller's module
  beforeEach(module('overcasterControllers'));

  var StartCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StartCtrl = $controller('StartCtrl', {
      $scope: scope
    });
  }));

  it('should have a list of recent sessions', function () {
    expect(scope.recentSessions).toBeDefined();
  });

  it('should have a list of recent scenes', function(){
    expect(scope.recentScenes).toBeDefined();
  });

  it('should have a list of recent elements', function(){
    expect(scope.recentElements).toBeDefined();
  });
});
