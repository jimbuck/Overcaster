'use strict';

describe('Service: JsonDataStore', function () {

  var fs = require('fs');

  var testFilename = './test.json';

  // load the service's module
  beforeEach(module('overcasterApp'));

  // instantiate service
  var JsonDataStore;
  beforeEach(inject(function (_JsonDataStore_) {
    JsonDataStore = _JsonDataStore_;

    deleteCurrentTestFile();
  }));

  // Delete the test file after each run...
  afterEach(function(){
    deleteCurrentTestFile();
  });

  it('should return a constructor', function () {
    expect(typeof JsonDataStore).toBe('function');
    expect(JsonDataStore.prototype).toBeDefined();
  });

  it('should accept a string path as a single parameter', function () {
    createNewTestFile();

    var dataStore = new JsonDataStore(testFilename);

    expect(dataStore.path).toBe(testFilename);
  });

  it('should accept an object as a single parameter with a `path` property', function () {
    var opts = {
      path: testFilename
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
      path: testFilename,
      defaults: {
        color: 'yellow',
        number: 10
      }
    };

    var dataStore = new JsonDataStore(opts);

    expect(dataStore.defaults).toEqual(opts.defaults);
  });

  it('should have a `get` method that returns a value', function () {

    var testValue = 'testValue';

    createNewTestFile({
      testKey: testValue
    });

    var dataStore = new JsonDataStore(testFilename);

    expect(dataStore.get('testKey')).toEqual(testValue);
  });

  it('should have a set method that stores a value', function () {
    var dataStore = new JsonDataStore(testFilename);

    var propertyName = 'setTest';
    var expectedValue = 'It worked!';

    dataStore.set(propertyName, expectedValue);

    expect(checkProperty(propertyName, expectedValue)).toEqual(true);
  });

  function deleteCurrentTestFile() {
    if (!!testFilename && fs.existsSync(testFilename)) {
      fs.unlinkSync(testFilename);
    }
  }

  function createNewTestFile(data){
    deleteCurrentTestFile();

    data = data || {};
    fs.writeFileSync(testFilename, JSON.stringify(data));
  }

  function checkProperty(key, value) {
    return JSON.parse(fs.readFileSync(testFilename, {encoding:'utf8'}))[key] == value;
  }
});
