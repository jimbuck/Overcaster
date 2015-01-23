'use strict';

describe('Service: MessagingService', function () {

  // load the service's module
  beforeEach(module('overcasterServices'));

  // instantiate service
  var MessagingService;
  beforeEach(inject(function (_Messaging_) {
    MessagingService = _Messaging_;
  }));

  it('should do something', function () {
    expect(!!MessagingService).toBe(true);
  });

});
