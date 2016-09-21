import format from '../utils/format';

export const isRequired = format(function(val) {
  return {
    con: val !== "",
    msg: "欄位為必填"
  }
});

export const isNumber = format(function(val) {
    return {
      con: !isNaN(parseFloat(val)) && isFinite(val),
      msg: "輸入內容必須為數字"
    }
});

export const isEmail = format(function(val) {
    return {
      con: val.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/) !== null,
      msg: "電子信箱格式不正確"
    }
});

export const isCellphone = format(function(val) {
    return {
      con: val.match(/^09[0-9]{8}$/),
      msg: "手機號碼格式不正確"
    }
});

export const maxLength = format(function(max, val) {
    return {
      con: ("" + val).length <= max,
      msg: "超過最大限制長度" + max + "字元"
    }
});

export const minLength = format(function(min, val) {
    return {
      con: ("" + val).length >= min,
      msg: "小於最小限制長度" + min + "字元"
    }
});

export const maxNum = format(function(max, val) {
    return {
      con: parseFloat(val) <= max,
      msg: "數值超過" + max
    }
});
