import compose from 'lodash.compose';
import filter from './filter';
import * as lib from './condition';

export default function (...args) {
  return function (x) {
    return filter(compose.apply(this, args)({ reason: null, val: x }));
  };
}

export { lib };
