export default function (condition) {
  return function () {
    const args = Array.prototype.splice.call(arguments, 0);
    const singleArgu = args.length <= 1;
    const [head] = args;
    const msg = singleArgu ? (typeof head === 'string' && head) || "" : args.pop();
    return function({ reason, val }) {
      if (!reason) {
        const cond = singleArgu ? [val] : args.concat(val);
        const { con, msg: resultMsg } = condition.apply(this, cond);
        return con ?
        { reason: null, val } :
        { reason: msg || resultMsg , val: "" }
      } else {
        return { reason }
      }
    }
  }
}
