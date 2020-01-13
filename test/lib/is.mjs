import { is } from '../../src/lib/index.mjs'

export default [
  { fn: is.string('string'), expect: true },
  { fn: is.string(2), expect: false },
  { fn: is.string(undefined), expect: false },
  { fn: is.string(false), expect: false },

  { fn: is.object({}), expect: true },
  { fn: is.object({ test: true }), expect: true },
  { fn: is.object(2), expect: false },
  { fn: is.object([]), expect: false },
  { fn: is.object(undefined), expect: false },
  { fn: is.object(false), expect: false },

  { fn: is.empty(0), expect: true },
  { fn: is.empty([]), expect: true },
  { fn: is.empty({}), expect: true },
  { fn: is.empty(''), expect: true },
  { fn: is.empty(false), expect: true },
  { fn: is.empty(undefined), expect: true },
  { fn: is.empty('string'), expect: false },
  { fn: is.empty(23), expect: false },
  { fn: is.empty([23, 5]), expect: false },
]
