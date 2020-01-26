import { is } from '@magic/test'

import crypto from '../src/index.mjs'

export default [
  { fn: () => crypto, expect: is.obj, info: 'webboot is a function' },
  { fn: () => crypto.hash.create, expect: is.fn, info: 'crypto.hash.create is a function' },
  {
    fn: () => crypto.hash.verify,
    expect: () => crypto.hash.check,
    info: 'crypto.hash.check is equal to crypto.hash.verify is a function',
  },
  { fn: () => crypto.hash.check, expect: is.fn, info: 'crypto.hash.check is a function' },
  { fn: crypto.wordlist.length, expect: 7777, info: 'more than 7000 words' },
  { fn: () => crypto.random.word, expect: is.function, info: 'word is a function' },
  { fn: () => crypto.random.words, expect: is.function, info: 'words is a function' },
]
