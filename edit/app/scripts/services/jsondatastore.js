'use strict';

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

/**
 * @ngdoc service
 * @name overcasterServices.JsonDataStore
 * @description
 * # JsonDataStore
 * Factory in the overcasterServices.
 */
angular.module('overcasterServices')
  .factory('JsonDataStore', function () {

    var readWriteOptions = {
      encoding: 'utf8'
    };

    var jsonRepo = function (opts) {
      if (typeof opts === 'string') {
        opts = {
          path: opts
        };
      }

      opts = opts || {};

      if (typeof opts.path === 'undefined') {
        throw new Error('Path must be specified for a JsonRepository!');
      }

      this.path = opts.path;
      this.defaults = opts.defaults || {};

      this.createIfMissing();
    };

    jsonRepo.prototype.get = function (key) {

      this.createIfMissing();

      var data = JSON.parse(fs.readFileSync(this.path, readWriteOptions));

      if (typeof key === 'undefined') {
        return data;
      } else {
        return data[key];
      }
    };

    jsonRepo.prototype.set = function (key, value) {
      if (typeof key === 'undefined') {
        throw new Error('Null Argument Exception: key');
      }

      this.createIfMissing();

      var data = this.get();

      data[key] = value;

      saveData(this.path, data);
    };

    jsonRepo.prototype.delete = function (key) {
      if (typeof key === 'undefined') {
        throw new Error('Null Argument Exception: key');
      }

      this.createIfMissing();

      var data = this.get();

      delete data[key];

      saveData(this.path, data);
    };

    jsonRepo.prototype.createIfMissing = function () {
      if (!fs.existsSync(this.path)) {
        saveData(this.path, this.defaults);
      }
    };

    function saveData(filepath, data) {
      var dir = path.dirname(filepath);

      if (!fs.existsSync(dir)) {
        mkdirp.sync(dir);
      }

      fs.writeFileSync(filepath, JSON.stringify(data, null, 2), readWriteOptions);
    }

    return jsonRepo;
  });
