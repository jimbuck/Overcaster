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
  var JsonDataStore;

  beforeEach(inject(function (_Settings_, _JsonDataStore_) {
    Settings = _Settings_;
    JsonDataStore = _JsonDataStore_;
  }));

  it('should return a JsonDataStore object', function () {
    expect(Settings instanceof JsonDataStore).toBe(true);
  });

  it('should have a get method', function () {
    expect(Settings).toBeDefined();
    expect(Settings.get).toBeDefined();
  });

  it('should have a set method', function () {
    expect(Settings).toBeDefined();
    expect(Settings.set).toBeDefined();
  });

  it('should have a default port value', function () {
    expect(Settings).toBeDefined();
    expect(Settings.get).toBeDefined();
    expect(Settings.get('port')).toBeDefined();
  });

});
