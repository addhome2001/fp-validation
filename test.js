'use strict';

const tape = require('tape');
const validate = require('./lib').default;
const libs = require('./libs');

const msg = "Custom Message";

const singleLib = lib => {
  const v = validate(lib());
  const vCostom = validate(lib(msg));
  return { v, vCostom }
}

tape('isRequired', t => {
  const vail = singleLib(libs.isRequired);
  t.is(vail.v(""), "欄位為必填", 'Must return default reason when is empty');
  t.is(vail.vCostom(""), msg, 'Must return custom reason');
  t.false(vail.v("Text"), "Should pass if value is not Empty");
  t.end();
});

tape('isNumber', t => {
  const vail = singleLib(libs.isNumber);
  t.is(vail.v(""), "輸入內容必須為數字", 'Must return default reason when not a number');
  t.is(vail.vCostom(""), msg, 'Must return custom reason');
  t.false(vail.v(1), "Should pass if value is not Empty")
  t.end();
});

tape('isEmail', t => {
  const vail = singleLib(libs.isEmail);
  t.is(vail.v("no email"), "電子信箱格式不正確", 'Must return default reason when not a email');
  t.is(vail.vCostom("no email"), msg, 'Must return custom reason');
  t.false(vail.v("abe@xxx.com"), "Should pass if value is Email")
  t.end();
});

tape('isCellphone', t => {
  const vail = singleLib(libs.isCellphone);
  t.is(vail.v("12345678"), "手機號碼格式不正確", 'Must return default reason when not a cellphone');
  t.is(vail.vCostom("12345678"), msg, 'Must return custom reason');
  t.false(vail.v("0912345678"), "Should pass if value is cellphone");
  t.end();
});
