const compose = require("lodash.compose");

const format = function(condition, defaultMsg) {
  return function() {
    const args = Array.prototype.splice.call(arguments, 0);
    const length = args.length;
    const head = args[0];
    const msg = length <= 1 ? (typeof head === 'string' && head) || defaultMsg : args.pop();
    return function(source) {
      if (!source.reason) {
        const cond = typeof head === 'string' ? [source.val] : args.concat(source.val)
        return condition.apply(this, cond) ?
        { reason: null, val: source.val } :
        { reason: msg, val: "" }
      } else {
        return { reason: source.reason }
      }
    }
  }
}

const filter = function(result) {
  return result.reason || false;
}

module.exports = {
  isRequired: format(function(val) {
    return val !== "";
  }, "欄位為必填"),

  isNumber: format(function(val) {
    return !isNaN(parseFloat(val)) && isFinite(val);
  }, "輸入內容必須為數字"),

  isEmail: format(function(val) {
    return val.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/) !== null;
  }, "電子信箱格式不正確"),

  isCellphone: format(function(val) {
    return val.match(/^09[0-9]{8}$/);
  }, "手機號碼格式不正確"),

  maxLength: format(function(max, val) {
    return ("" + val).length <= max;
  }, '超過限制長度'),

  minLength: format(function(min, val) {
    return ("" + val).length >= min;
  }, '小於限制長度'),

  maxNum: format(function(max, val) {
    return parseFloat(val) <= max;
  }, "內容超過限制大小"),

  validate: function() {
    const args = arguments;
    return function(x) {
      return filter(compose.apply(this, args)({ reason: null, val: x }))
    }
  }
}
