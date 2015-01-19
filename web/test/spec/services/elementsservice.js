'use strict';

describe('Service: ElementsService', function () {

  // load the service's module
  beforeEach(module('overcasterApp'));

  // instantiate service
  var ElementsService;
  beforeEach(inject(function (_ElementsService_) {
    ElementsService = _ElementsService_;
  }));

  it('should do something', function () {
    expect(!!ElementsService).toBe(true);
  });

});
