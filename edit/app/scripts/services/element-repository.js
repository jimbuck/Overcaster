'use strict';

angular.module('overcasterApp')
  .factory('ElementRepository', function ($q, _, Settings, fs) {

    var elements = [
      {
        id: 1,
        name: '2 Player Scoreboard',
        dir: '2_player_scoreboard',
        inUse: false
      },
      {
        id: 2,
        name: '4 Player Scoreboard',
        dir: '4_player_scoreboard',
        inUse: true
      },
      {
        id: 3,
        name: 'Horizontal Twitter Feed',
        dir: 'horizontal_twitter_feed',
        inUse: true
      },
      {
        id: 4,
        name: 'Spotify Stream Player',
        dir: 'spotify_stream_player',
        inUse: false
      }
    ];

    function getDirectories(path){
      return $q(function (resolve, reject) {
        fs.readdir(path, function (err, files) {
          var dirs, filePath, results;
          dirs = [];
          results = [];
          for (var index = 0; index < files.length; index++) {
            var file = files[index];
            if (file[0] !== '.') {
              filePath = rootDir + "/" + file;
              results.push(fs.stat(filePath, function (err, stat) {
                if (stat.isDirectory()) {
                  dirs.push(file);
                }
                if (files.length === (index + 1)) {
                  resolve(dirs);
                }
              }));
            } else {
              results.push(void 0);
            }
          }
          return results;
        });
      });
    }

    getDirectories('%AppData%');

    function ElementRepository(path){
      this.path = path;

      if(!this.path) {
        this._init = Settings.get('elementsPath').then(function(path){
          this.path = path;
        });
      }
    }

    ElementRepository.prototype.load = function (arg) {

      return this._init.then(function(){
        var matchingElements = [];



        // Find the element by id...
        if (typeof arg === 'string' || typeof arg === 'number') {
          matchingElements = _.find(elements, {id: parseInt(arg)});
        }
        // Find the element by predicate...
        else if (typeof arg === 'function') {
          matchingElements = _.filter(elements, arg);
        }
        // Find the element by matching properties...
        else if (typeof arg === 'object') {
          matchingElements = _.find(elements, arg);
        }
        // Return all...
        else {
          matchingElements = elements;
        }

        return $q.when(matchingElements);
      });
    };

    ElementRepository.prototype.save = function (element, throwIfExists) {

      return this._init.then(function() {

        if (element.id && _.any(elements, {id: parseInt(element.id)})) {

          if (throwIfExists) {
            return $q.reject('Element already exists!');
          }

          return this.delete(element.id);
        }
      }).then(function(){

        element.id = element.id || _.max(elements, 'id').id + 1;
        elements.push(element);
        return element;
      });
    };

    ElementRepository.prototype.delete = function (arg) {

      return this._init.then(function () {
        if (typeof arg === 'string' || typeof arg === 'number') {
          elements = _.without(elements, _.findWhere(elements, {id: parseInt(arg)}));
        }
        else if (typeof arg === 'function') {
          elements = _.reject(elements, arg);
        }
      }).then(function () {

      });
    };

    return ElementRepository;
  });
