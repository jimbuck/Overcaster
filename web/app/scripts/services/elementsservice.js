'use strict';

/**
 * @ngdoc service
 * @name overcasterApp.ElementsService
 * @description
 * # ElementsService
 * Factory in the overcasterApp.
 */
angular.module('overcasterApp')
  .factory('ElementsService', function ($q) {

    var elements = [
      {
        id: 0,
        name: '2 Player Scoreboard',
        dir: '2_player_scoreboard',
        inUse: false
      },
      {
        id: 1,
        name: '4 Player Scoreboard',
        dir: '4_player_scoreboard',
        inUse: true
      },
      {
        id: 2,
        name: 'Horizontal Twitter Feed',
        dir: 'horizontal_twitter_feed',
        inUse: true
      },
      {
        id: 3,
        name: 'Spotify Stream Player',
        dir: 'spotify_stream_player',
        inUse: false
      }
    ];

    function loadFunc(arg){

      var matchingElements = [];

      var deferred = $q.defer();

      //setTimeout(function(){
        if (typeof arg === 'string' || typeof arg === 'number')
        {
          matchingElements = _.where(elements, {id: parseInt(arg)});
        }
        else if (typeof arg === 'function')
        {
          matchingElements = _.filter(elements, arg);
        }
        else
        {
          matchingElements = _.where(elements, arg);
        }
      //, 1000);

      deferred.resolve(matchingElements);

      return deferred.promise;
    }

    function saveFunc(element) {

      var deferred = $q.defer();

      deleteFunc(element.id).then(function(){
        elements.push(element);
        deferred.resolve(element);
      });

      return deferred.promise;
    }

    function deleteFunc(arg) {

      var deferred = $q.defer();

      if (typeof arg === 'string' || typeof arg === 'number')
      {
        elements = _.without(elements, _.findWhere(elements, {id: parseInt(arg)}));
      }

      if (typeof arg === 'function')
      {
        elements = _.reject(elements, arg);
      }

      deferred.resolve();

      return deferred.promise;
    }

    return {
      load: loadFunc,
      save: saveFunc,
      'delete': deleteFunc
    };
  });
