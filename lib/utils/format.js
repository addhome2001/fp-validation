"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = function (condition) {
  return function () {
    var args = Array.prototype.splice.call(arguments, 0);
    var singleArgu = args.length <= 1;

    var _args = _slicedToArray(args, 1);

    var head = _args[0];

    var msg = singleArgu ? typeof head === 'string' && head : args.pop();
    return function (_ref) {
      var reason = _ref.reason;
      var val = _ref.val;

      if (!reason) {
        var cond = singleArgu && msg ? [val] : args.concat(val);

        var _condition$apply = condition.apply(this, cond);

        var con = _condition$apply.con;
        var resultMsg = _condition$apply.msg;

        return con ? { reason: null, val: val } : { reason: msg || resultMsg, val: "" };
      } else {
        return { reason: reason };
      }
    };
  };
};