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

  xit('should present a list of recent sessions', function () {

  });

  xit('should present a list of recent scenes', function(){

  });

  xit('should present a list of recent elements', function(){

  });
});
