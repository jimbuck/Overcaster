'use strict';

describe('Service: ocUtils', function () {

  // load the service's module
  beforeEach(module('overcasterApp'));

  // instantiate service
  var ocUtils;
  beforeEach(inject(function (_ocUtils_) {
    ocUtils = _ocUtils_;
  }));

  xit('should do something', function () {
    expect(ocUtils).toBeDefined();
  });

});
