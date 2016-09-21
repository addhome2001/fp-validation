'use strict';

var tape = require('tape');
var vail = require('./');

tape('compose vail', (assert) => {
  var v = vail.validate(vail.maxLength(10), vail.maxNum(100, '超過了'), vail.isNumber(), vail.isRequired());
  var result = v(120);

  console.log(result);

  // assert.deepEqual(
  //     gen.next(),
  //     { done: true, value: undefined },
  //     'Must return a finish object'
  // );

  assert.end();
});
