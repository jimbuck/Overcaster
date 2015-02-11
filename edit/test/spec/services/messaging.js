'use strict';

describe('Service: MessagingService', function () {

  // load the service's module
  beforeEach(module('overcasterApp'));

  // instantiate service
  var MessagingService;
  beforeEach(inject(function (_MessagingService_) {
    MessagingService = _MessagingService_;
  }));

  it('should do something', function () {
    expect(!!MessagingService).toBe(true);
  });

});
