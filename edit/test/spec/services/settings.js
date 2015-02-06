'use strict';

var path = require('path');

if (typeof global.appData === 'undefined') {
  global.appData = path.join(require('nw.gui').App.dataPath, '../Overcaster');
}

describe('Service: Settings', function () {

  // load the service's module
  beforeEach(module('overcasterServices'));

  // instantiate service
  var Settings;

  beforeEach(inject(function (_Settings_) {
    Settings = _Settings_;
  }));

  it('should have a `get` method with no parameters that returns the entire structure', function () {

    var expectedValue = {
      val1: 1,
      val2: 2
    };

    spyOn(Settings.dataStore, 'get').and.returnValue(expectedValue);

    expect(Settings.get()).toBe(expectedValue);
  });

  it('should have a default port value', function () {
    expect(Settings).toBeDefined();
    expect(Settings.get).toBeDefined();
    expect(Settings.get('port')).toBeDefined();
  });

});
