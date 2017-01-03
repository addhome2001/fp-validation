export default function (condition) {
  return function (...args) {
    const singleArgu = args.length <= 1;
    const [head] = args;
    const msg = singleArgu ? (typeof head === 'string' && head) : args.pop();
    return function ({ reason, val }) {
      if (reason === null) {
        const cond = singleArgu && msg ? [val] : args.concat(val);
        const { con, msg: resultMsg } = condition.apply(this, cond);
        return con ? { reason: null, val } : { reason: msg || resultMsg, val: '' };
      }
      return { reason };
    };
  };
}
