import { is } from '@magic/test'

import crypto, { hash, ecdh, wordlist } from '../src/index.mjs'

export default [
  { fn: () => crypto, expect: is.obj, info: 'webboot is a function' },
  { fn: () => crypto.hash.create, expect: is.fn, info: 'crypto.hash.create is a function' },
  {
    fn: () => crypto.hash.create,
    expect: () => hash.create,
    info: 'crypto.hash.create and hash.create are equal',
  },
  {
    fn: () => crypto.hash.verify,
    expect: () => hash.verify,
    info: 'crypto.hash.verify and hash.verify are equal',
  },
  {
    fn: () => crypto.hash.check,
    expect: () => hash.check,
    info: 'crypto.hash.check and hash.check are equal',
  },
  {
    fn: () => crypto.hash.verify,
    expect: () => crypto.hash.check,
    info: 'crypto.hash.check is equal to crypto.hash.verify is a function',
  },
  { fn: () => crypto.hash.check, expect: is.fn, info: 'crypto.hash.check is a function' },

  { fn: () => crypto.ecdh, expect: () => ecdh, info: 'crypto.ecdh and ecdh export are equal' },
  { fn: wordlist.length, expect: 7777, info: 'more than 7000 words' },
]
