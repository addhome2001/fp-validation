'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (condition) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var singleArgu = args.length <= 1;
    var head = args[0];

    var msg = singleArgu ? typeof head === 'string' && head : args.pop();
    return function (_ref) {
      var reason = _ref.reason,
          val = _ref.val;

      if (reason === null) {
        var cond = singleArgu && msg ? [val] : args.concat(val);

        var _condition$apply = condition.apply(this, cond),
            con = _condition$apply.con,
            resultMsg = _condition$apply.msg;

        return con ? { reason: null, val: val } : { reason: msg || resultMsg, val: '' };
      }
      return { reason: reason };
    };
  };
};