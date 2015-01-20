'use strict';

describe('Service: ElementsService', function () {

  var ElementsService;
  var $scope;

  // load the service's module
  beforeEach(module('overcasterServices'));

  // instantiate service
  beforeEach(inject(function ($rootScope, _ElementsService_) {
    ElementsService = _ElementsService_;
    $scope = $rootScope;
  }));

  it('should return a list of elements.', function (done) {

    ElementsService.load().then(function (elements) {

      expect(elements.length).toBeGreaterThan(0);
      done();

    });

    $scope.$apply();
  });

});
