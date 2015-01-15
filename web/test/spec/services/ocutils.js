'use strict';

describe('Service: ocUtils', function () {

  // load the service's module
  beforeEach(module('overcasterServices'));

  // instantiate service
  var ocUtils;
  beforeEach(inject(function (_ocUtils_) {
    ocUtils = _ocUtils_;
  }));

  it('should do something', function () {
    expect(!!ocUtils).toBe(true);
  });

});
