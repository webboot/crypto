export const is = {
  string: e => typeof e === 'string',
  object: e => e instanceof Object && !Array.isArray(e),
  empty: e => {
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
