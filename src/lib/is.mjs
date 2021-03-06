export const is = {
  buffer: e => e instanceof Buffer,
  function: e => typeof e === 'function',
  integer: e => typeof e !== 'object' && e === +e,
  string: e => typeof e === 'string',
  object: e =>
    e instanceof Object &&
    !Array.isArray(e) &&
    typeof e !== 'function' &&
    e instanceof Date !== true,
  empty: e => {
    if (!e) {
      return true
    }

    if (is.buffer(e)) {
      return e.length === 0
    }

    if (e && typeof e.length !== 'undefined') {
      return e.length === 0
    }

    if (is.object(e)) {
      return Object.keys(e).length === 0
    }

    return !e
  },
}

export default is
