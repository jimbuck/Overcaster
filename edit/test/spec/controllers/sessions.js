'use strict';

describe('Controller: SessionsCtrl', function () {

  // load the controller's module
  beforeEach(module('overcasterControllers'));

  var SessionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SessionsCtrl = $controller('SessionsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of sessions to the scope', function () {
    expect(scope.sessions.length).toBe(9);
  });

  it('should increase the number of columns', function(){
    var prev = scope.sessionColumns;
    scope.incColumns();
    expect(scope.sessionColumns).toBe(prev + 1);
  });

  it('should decrease the number of columns', function(){
    var prev = scope.sessionColumns;
    scope.decColumns();
    expect(scope.sessionColumns).toBe(prev - 1);
  });
});
