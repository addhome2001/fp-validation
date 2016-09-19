const compose = require("lodash.compose");

const format = function(condition) {
  return function() {
    const args = Array.prototype.splice.call(arguments, 0);
    const length = args.length;
    const head = args[0];
    const msg = length <= 1 ? (typeof head === 'string' && head) || "" : args.pop();
    return function(source) {
      if (!source.reason) {
        const cond = typeof head === 'string' ? [source.val] : args.concat(source.val);
        const result = condition.apply(this, cond);
        return result.con ?
        { reason: null, val: source.val } :
        { reason: msg || result.msg , val: "" }
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
    return {
      con: val !== "",
      msg: "欄位為必填"
    }
  }),

  isNumber: format(function(val) {
    return {
      con: !isNaN(parseFloat(val)) && isFinite(val),
      msg: "輸入內容必須為數字"
    }
  }),

  isEmail: format(function(val) {
    return {
      con: val.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/) !== null,
      msg: "電子信箱格式不正確"
    }
  }),

  isCellphone: format(function(val) {
    return {
      con: val.match(/^09[0-9]{8}$/),
      msg: "手機號碼格式不正確"
    }
  }),

  maxLength: format(function(max, val) {
    return {
      con: ("" + val).length <= max,
      msg: "超過最大限制長度" + max + "字元"
    }
  }),

  minLength: format(function(min, val) {
    return {
      con: ("" + val).length >= min,
      msg: "小於最小限制長度" + min + "字元"
    }
  }),

  maxNum: format(function(max, val) {
    return {
      con: parseFloat(val) <= max,
      msg: "數值超過" + max
    }
  }),

  validate: function() {
    const args = arguments;
    return function(x) {
      return filter(compose.apply(this, args)({ reason: null, val: x }))
    }
  }
}
