'use strict';

describe('Service: JsonDataStore', function () {

  // load the service's module
  beforeEach(module('overcasterServices'));

  // instantiate service
  var JsonDataStore;
  beforeEach(inject(function (_JsonDataStore_) {
    JsonDataStore = _JsonDataStore_;
  }));

  it('should return a constructor', function () {
    expect(typeof JsonDataStore).toBe('function');
    expect(JsonDataStore.prototype).toBeDefined();
  });

  it('should accept a string path as a single parameter', function () {
    var filepath = './test.json';
    var dataStore = new JsonDataStore(filepath);
    expect(dataStore.path).toBe(filepath);
  });

  it('should accept an object as a single parameter with a `path` property', function () {
    var opts = {
      path: './test.json'
    };

    var repo = new JsonDataStore(opts);
    expect(repo.path).toBe(opts.path);
  });

  it('should throw an error when no parameter is provided', function () {
    function createWithoutParameters() {
      new JsonDataStore();
    }

    expect(createWithoutParameters).toThrow();
  });

  it('should throw an error when object parameter has no `path`', function () {
    function createWithoutPathProperty() {
      new JsonDataStore({});
    }

    expect(createWithoutPathProperty).toThrow();
  });

  it('should accept default values to use when the file is not present', function () {
    var opts = {
      path: './test.json',
      defaults: {
        color: 'yellow',
        number: 10
      }
    };

    var dataStore = new JsonDataStore(opts);
    expect(dataStore.defaults).toBe(opts.defaults);
  });

  it('should have a get method', function () {
    var dataStore = new JsonDataStore('test.json');

    expect(dataStore).toBeDefined();
    expect(dataStore.get).toBeDefined();
  });

  it('should have a set method', function () {
    var dataStore = new JsonDataStore('test.json');

    expect(dataStore).toBeDefined();
    expect(dataStore.set).toBeDefined();
  });

  //it('should ');
});
