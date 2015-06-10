'use strict';

angular.module('overcasterApp')
  .factory('JsonRepository', function (fs, path, mkdirp, $q) {

    var readWriteOptions = {
      encoding: 'utf8'
    };

    function JsonRepository(opts) {
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
    }

    JsonRepository.prototype.get = function (key) {

      this.createIfMissing().then(function(){
        return $q(function(resolve, reject){
          fs.readFile(this.path, readWriteOptions, function (err, json) {
            if(err){
              reject(err);
              return;
            }

            var data = JSON.parse(json);

            if (typeof key === 'undefined') {
              resolve(data);
            } else {
              resolve(data[key]);
            }
          });
        });
      });
    };

    JsonRepository.prototype.set = function (key, value) {
      if (typeof key === 'undefined') {
        return $q.reject('Null Argument Exception: key');
      }

      return this.createIfMissing().then(function(){
        return this.get();
      }).then(function(data){
        data[key] = value;

        return saveData(this.path, data);
      });
    };

    JsonRepository.prototype.delete = function (key) {
      if (typeof key === 'undefined') {
        return $q.reject('Null Argument Exception: key');
      }

      return this.createIfMissing().then(function(){
        return this.get();
      }).then(function(data){
        data[key] = null;

        return saveData(this.path, data);
      });
    };

    JsonRepository.prototype.createIfMissing = function () {
      return $(function(resolve, reject){
        fs.exists(this.path, function (err, exists) {
          if(err) {
            reject(err);
          } else {
            resolve(exists);
          }
        });
      }).then(function(exists){
        if(exists){
          return $q.when();
        } else {
          return saveData(this.path, this.defaults)
        }
      });
    };

    function saveData(filepath, data) {
      return $q(function(resolve, reject){
        var dir = path.dirname(filepath);

        fs.exists(dir, function (err, exists) {
          if(err){
            reject(err);
            return;
          }

          mkdirp(dir, function (err) {
            if (err) {
              reject(err);
              return;
            }

            fs.writeFile(filepath, JSON.stringify(data, null, 2), readWriteOptions, function(err){
              if(err){
                reject(err);
              } else {
                resolve();
              }
            });
          });
        });
      });
    }

    return JsonRepository;
  });
