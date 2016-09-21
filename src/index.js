import compose from "lodash.compose";
import filter from './filter';
import * as lib from './lib/condition';

export default function() {
  const args = arguments;
  return function(x) {
    return filter(compose.apply(this, args)({ reason: null, val: x }))
  }
}

export { lib };
