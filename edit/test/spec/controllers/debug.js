'use strict';

describe('Controller: DebugCtrl', function () {

  // load the controller's module
  beforeEach(module('overcasterControllers'));

  var DebugCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DebugCtrl = $controller('DebugCtrl', {
      $scope: scope
    });
  }));

  // Debug tests can be written here...

  });
