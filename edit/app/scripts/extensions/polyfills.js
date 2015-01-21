/*jshint bitwise: false*/
'use strict';

//object method extension: 'extend' declaration
if (!Object.prototype.extendProperties) {
  Object.defineProperty(Object.prototype, 'extendProperties', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function () {
      for (var index in arguments) {
        var obj = arguments[index];
        for (var key in obj) {
          var value = obj[key];
          if (this[key] && this[key].constructor && this[key].constructor === Object) {
            this[key] = this[key].extendProperties(value);
          } else {
            this[key] = value;
          }
        }
      }

      return this;
    }
  });
}

//array method extension: 'isArray' declaration
if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

//array method extension: 'find' declaration
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function (predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        if (i in list) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return value;
          }
        }
      }
      return undefined;
    }
  });
}

//array method extension: 'addOrUpdate' declaration
if (!Array.prototype.addOrUpdate) {
  Object.defineProperty(Array.prototype, 'addOrUpdate', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function (item, predicate) {
      if (!predicate || item instanceof 'undefined'){
        return false;
      }

      //If item exists, find it
      var matchingIndex = -1;

      this.find(function (element, index, array) {
        if (element && predicate(item, element)) {
          //store the index
          matchingIndex = index;
        }
      });

      if (matchingIndex < 0) { //Item does not exist, Add to collection
        this.push(item);
        return true;
      } else { //Item already exists, update it
        this[matchingIndex] = this[matchingIndex].extendProperties(item);
        return true;
      }

      return false; //Catch route, if it hits this point, something failed;
    }
  });
}
