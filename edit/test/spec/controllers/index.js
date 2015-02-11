'use strict';

describe('Controller: IndexCtrl', function () {

  // load the controller's module
  beforeEach(module('overcasterApp'));

  var IndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IndexCtrl = $controller('IndexCtrl', {
      $scope: scope
    });
  }));

  // Tests go here...
});
