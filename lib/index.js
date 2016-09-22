'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lib = undefined;

exports.default = function () {
  var args = arguments;
  return function (x) {
    return (0, _filter2.default)(_lodash2.default.apply(this, args)({ reason: null, val: x }));
  };
};

var _lodash = require('lodash.compose');

var _lodash2 = _interopRequireDefault(_lodash);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _condition = require('./condition');

var lib = _interopRequireWildcard(_condition);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.lib = lib;