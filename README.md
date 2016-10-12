# FP-Validation

[![Build Status](https://travis-ci.org/addhome2001/fp-validation.svg?branch=master)](https://travis-ci.org/addhome2001/fp-validation)

[![Known Vulnerabilities](https://snyk.io/test/github/addhome2001/fp-validation/d763f8e1d95e6e74931089feb60076a92234ce21/badge.svg)](https://snyk.io/test/github/addhome2001/fp-validation/d763f8e1d95e6e74931089feb60076a92234ce21)

`fp-validation` is a FP like validation library, it can let you compose validation function. It's inspired by `compose`.

## Install
```
npm install fp-validation
```

## Test

```
npm test
```

## Usage
___Require fp-validation___

```js
import vailCompose from 'fp-validation';
import { isNumber, isRequired } from 'fp-validation/libs';
```

___You can get pass a single lib as parameter:___

```js
const isNum = vailCompose(isNumber("Is not a Number"));
vail('foo'); // => "Is not a Number"
vail(123); // => false
```

___You can also pass multiple libs as parameters:___

> Will apply all libs from right to left.

```js
const isNumIsReq = vailCompose(isNumber("Is not a Number"), isRequired('The value cannot empty'));
isNumIsReq(""); // => "The value cannot empty"
isNumIsReq("foo"); // => "Is not a Number"
isNumIsReq(123) // => false
```

## API

### vailCompose(libs)

#### libs

Type: `function`

Return: If all the validation of the libs are true will be `false` otherwise is `string`(reason).

The libs you want to compose.

### libs

#### isRequired([reason]) ####

> Default: 欄位為必填

#### isNumber([reason]) ####

> Default: 輸入內容必須為數字

#### isEmail([reason]) ####

> Default: 電子信箱格式不正確

#### maxLength(length, [reason]) ####
> Default: 超過最大限制長度`length`字元

#### minLength(length, [reason]) ####
> Default: 小於最小限制長度`length`字元

#### maxNum(max, [reason]) ####
> Default: 數值超過`max`


LICENSE
=======

MIT
