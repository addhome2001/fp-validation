'use strict';

const tape = require('tape');
const vail = require('./dist');

const lib = vail.lib;
const validate = vail.default;

tape('isRequired', t => {
  const v = validate(lib.isRequired());
  const msg = "Custom Message";
  const vCostom = validate(lib.isRequired(msg));
  t.is(v(""), "欄位為必填", 'Must return default reason');
  t.is(vCostom(""), msg, 'Must return custom reason');

  t.false(v("Text"), "Should pass if value is not Empty");
  t.end();
});

tape('isNumber', t => {
  const v = validate(lib.isNumber());
  const msg = "Custom Message";
  const vCostom = validate(lib.isRequired(msg));
  t.is(v(""), "輸入內容必須為數字", 'Must return default reason');
  t.is(vCostom(""), msg, 'Must return custom reason');

  t.ok(v("Text"), 'Must return reason when not a number');
  t.false(v(1), "Should pass if value is not Empty")
  t.end();
});
