import { is, tryCatch } from '@magic/test'

import { words } from '../../src/random/words.mjs'

const runs = process.env.RUNS || 1

export default [
  {
    fn: async () => await words(12),
    runs,
    expect: w => is.len.eq(w, new Set(w)),
    info: `Test single list of words for uniqueness ${runs} times`,
  },
  {
    fn: async () => new Set(await words(12)),
    runs,
    expect: is.len.eq(12),
    info: `Test number of returned words ${runs} times`,
  },
  {
    fn: async () => await words(12),
    runs,
    expect: async t => !is.deep.equal(t, await words(12)),
    info: `Test 2 lists of words for uniqueness ${runs} times`,
  },
  {
    fn: tryCatch(words, 'test'),
    expect: is.error,
    info: `non number argument throws`,
  },
  {
    fn: tryCatch(words, -1),
    expect: is.error,
    info: `negative number argument throws`,
  },
  {
    fn: tryCatch(words),
    expect: is.error,
    info: `if no arg is provided, words throws`,
  },
]
