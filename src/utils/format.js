export default function (condition) {
  return function (...args) {
    const singleArgu = args.length <= 1;
    const [head] = args;
    const msg = singleArgu ? (typeof head === 'string' && head) : args.pop();
    return function ({ reason, val }) {
      if (reason === null) {
        const cond = singleArgu && msg ? [val] : args.concat(val);
        const result = condition.apply(this, cond);
        return result.con ? { reason: null, val } : { reason: msg || result.msg, val: '' };
      }
      return { reason };
    };
  };
}
