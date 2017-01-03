const tape = require('tape');
const validate = require('./lib').default;
const libs = require('./libs');
const filter = require('./lib/filter').default;
const format = require('./lib/utils/format').default;

const msg = 'Custom Message';

const singleLib = (lib) => {
  const v = validate(lib());
  const vCostom = validate(lib(msg));
  return { v, vCostom };
};

tape('filter', (t) => {
  t.false(filter({ reason: null }));
  t.equal(filter({ reason: 'reason' }), 'reason');
  t.end();
});

tape('isRequired', (t) => {
  const vail = singleLib(libs.isRequired);
  t.is(vail.v(''), '欄位為必填', 'Must return default reason when is empty');
  t.is(vail.vCostom(''), msg, 'Must return custom reason');
  t.false(vail.v('Text'), 'Should pass if value is not Empty');
  t.end();
});

tape('isNumber', (t) => {
  const vail = singleLib(libs.isNumber);
  t.is(vail.v(''), '輸入內容必須為數字', 'Must return default reason when not a number');
  t.is(vail.vCostom(''), msg, 'Must return custom reason');
  t.false(vail.v(1), 'Should pass if value is not Empty');
  t.end();
});

tape('isEmail', (t) => {
  const vail = singleLib(libs.isEmail);
  t.is(vail.v('no email'), '電子信箱格式不正確', 'Must return default reason when not a email');
  t.is(vail.vCostom('no email'), msg, 'Must return custom reason');
  t.false(vail.v('abe@xxx.com'), 'Should pass if value is Email');
  t.end();
});

tape('isCellphone', (t) => {
  const vail = singleLib(libs.isCellphone);
  t.is(vail.v('12345678'), '手機號碼格式不正確', 'Must return default reason when not a cellphone');
  t.is(vail.vCostom('12345678'), msg, 'Must return custom reason');
  t.false(vail.v('0912345678'), 'Should pass if value is cellphone');
  t.end();
});

tape('maxLength', (tt) => {
  const length = 5;
  const v = validate(libs.maxLength(length));
  const vCostom = validate(libs.maxLength(length, msg));

  tape('maxLength with failure situation', (t) => {
    t.is(v(123456), `超過最大限制長度${length}字元`, "Must return default reason when value's length more than 5");
    t.is(vCostom(123456), msg, "Must return coustom reason when value's length more than 5");
    t.end();
  });
  tape('maxLength with success situation', (t) => {
    t.false(v(123), "Should pass if value's length fewer than 5");
    t.end();
  });
  tt.end();
});

tape('minLength', (tt) => {
  const length = 5;
  const v = validate(libs.minLength(length));
  const vCostom = validate(libs.minLength(length, msg));

  tape('minLength with failure situation', (t) => {
    t.is(v(123), `小於最小限制長度${length}字元`, "Must return default reason when value's length fewer than 5");
    t.is(vCostom(123), msg, "Must return coustom reason when value's length fewer than 5");
    t.end();
  });
  tape('minLength with success situation', (t) => {
    t.false(v(123456), "Should pass if value's length more than 5");
    t.end();
  });
  tt.end();
});

tape('maxNum', (tt) => {
  const maxNum = 10;
  const v = validate(libs.maxNum(maxNum));
  const vCostom = validate(libs.maxNum(maxNum, msg));

  tape('maxNum with failure situation', (t) => {
    t.is(v(11), `數值超過${maxNum}`, 'Must return default reason when value more than 10');
    t.is(vCostom(11), msg, "Must return coustom reason when value's length more than 10");
    t.end();
  });
  tape('maxNum with success situation', (t) => {
    t.false(v(9), 'Should pass if value fewer than 10');
    t.end();
  });
  tt.end();
});

tape('format function', (t) => {
  const failure = format(val => ({ con: val, msg: 'failure' }))();
  t.deepEqual(failure({ reason: null, val: false }), { reason: 'failure', val: '' }, 'failure situation');

  const success = format(val => ({ con: val, msg: 'success' }))();
  t.deepEqual(success({ reason: null, val: true }), { reason: null, val: true }, 'success situation');

  const through = format(val => ({ con: val, msg: 'test' }))();
  t.deepEqual(through({ reason: 'reason' }), { reason: 'reason' }, 'Should pass condition object if reason is not null');

  t.end();
});

tape('compose libs function', (tt) => {
  tape('isRequired & isNumber & maxLength', (t) => {
    const v = validate(libs.maxNum(100, 'More than 100'), libs.maxLength(3, 'Length more than 3'), libs.isNumber("It's not a number"), libs.isRequired('Must require'));
    t.equal(v(''), 'Must require');
    t.equal(v('test'), "It's not a number");
    t.equal(v(1234), 'Length more than 3');
    t.equal(v(101), 'More than 100');
    t.false(v(99));
    t.end();
  });

  tt.end();
});
