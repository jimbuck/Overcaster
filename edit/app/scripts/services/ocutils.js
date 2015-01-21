'use strict';

/**
 * @ngdoc service
 * @name overcasterServices.ocUtils
 * @description
 * # ocUtils
 * Factory in the overcasterApp.
 */
angular.module('overcasterServices')
  .factory('ocUtils', function () {
    // Service logic

    //function 'generateGuid'
    function generateGuid() {
      var valueArray = [];

      for (var i = 0; i < 8; i++) {
        valueArray.push((((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1));
      }

      // then to call it, plus stitch in '4' in the third group
      return (valueArray[0] + valueArray[1] + '-' + valueArray[2] + '-4' + valueArray[3].substr(0, 3) + '-' + valueArray[4] + '-' + valueArray[5] + valueArray[6] + valueArray[7])
        .toLowerCase();
    }

    //function 'getRegexResults'
    function getRegexResults(regEx, value) {
      var results = regEx.exec(value);

      if (results === undefined || results === null || results.length <= 1) {
        return [];
      }

      else {
        return results.slice(1);
      }
    }

    // Public API here
    return {
      getRegexResults: getRegexResults,
      generateGuid: generateGuid
    };
  });
