import { is, tryCatch } from '@magic/test'

import crypto, { hash } from '../src/index.mjs'

const expectedHash = {
  algorithm: 'sha384',
  hash: 'z0gR10/UBQRnT8MnP4JPpC91W5ZgoukCtX8d90hz2xqRoDe87mXxqI7NHvV/8lTJ',
}

export default [
  {
    fn: crypto.hash.create('testing'),
    expect: hash.create('testing'),
    info: 'both hash exports return the same hash',
  },
  {
    fn: hash.create('testing'),
    expect: expectedHash,
    info: 'hash returned for "testing" is same as hardcoded hash.',
  },
  {
    fn: hash.create('testing'),
    expect: t => t.algorithm === 'sha384',
    info: 'default algorithm is sha384',
  },
  { fn: tryCatch(hash.create, ''), expect: is.error, info: 'create: omitting the str throws' },

  { fn: hash.check('testing', expectedHash.hash), expect: true },
  {
    fn: tryCatch(hash.check, 'testing'),
    expect: is.error,
    info: 'check: omitting the hash throws',
  },
  {
    fn: tryCatch(hash.check, '', 'hash'),
    expect: is.error,
    info: 'check: omitting the str throws',
  },
]
