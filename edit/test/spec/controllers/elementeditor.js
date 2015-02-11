'use strict';

describe('Controller: ElementEditorCtrl', function () {

  // load the controller's module
  beforeEach(module('overcasterControllers'));

  var ElementEditorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ElementEditorCtrl = $controller('ElementEditorCtrl', {
      $scope: scope
    });
  }));
});
