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

//array method extension: 'indexOf' declaration
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement, fromIndex) {

    var k;

    // 1. Let O be the result of calling ToObject passing
    //    the this value as the argument.
    if (this === null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      var kValue;
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of O with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}

//array method extension: 'addOrUpdate' declaration
if (!Array.prototype.addOrUpdate) {
  Object.defineProperty(Array.prototype, 'addOrUpdate', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function (item, predicate) {
      if (!predicate || item instanceof 'undefined') {
        return false;
      }

      //If item exists, find it
      var matchingIndex = -1;

      this.find(function (element, index, array) {
        if (element && predicate(item, element)) {
          //store the index
          matchingIndex = index;
          return true;
        }
        return false;
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
