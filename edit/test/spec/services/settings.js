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

  it('should return a settings object', function () {
    expect(Settings).toBeDefined();
  });

  it('should have a get method', function () {
    expect(Settings).toBeDefined();
    expect(Settings.get).toBeDefined();
  });

  it('should have a set method', function () {
    expect(Settings).toBeDefined();
    expect(Settings.set).toBeDefined();
  });

  it('should have default values', function () {
    expect(Settings).toBeDefined();
    expect(Settings.get).toBeDefined();
    expect(Settings.get('port')).toBeDefined();
  });

});
