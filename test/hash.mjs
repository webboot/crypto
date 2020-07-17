import { is, tryCatch } from '@magic/test'

import crypto from '../src/index.mjs'

const expectedHash = {
  algorithm: 'sha384',
  hash: 'z0gR10/UBQRnT8MnP4JPpC91W5ZgoukCtX8d90hz2xqRoDe87mXxqI7NHvV/8lTJ',
}

export default [
  {
    fn: crypto.hash.create('testing'),
    expect: crypto.hash.create(Buffer.from('testing')),
    info: 'two hashes with same input return the same hash',
  },
  {
    fn: crypto.hash.create('testing'),
    expect: expectedHash,
    info: 'hash returned for "testing" is same as hardcoded hash.',
  },
  {
    fn: crypto.hash.create('testing'),
    expect: t => t.algorithm === 'sha384',
    info: 'default algorithm is sha384',
  },
  {
    fn: tryCatch(crypto.hash.create, ''),
    expect: is.error,
    info: 'create: omitting the data throws',
  },
  {
    fn: tryCatch(crypto.hash.create, ''),
    expect: t => t.name === 'E_DATA_EMPTY',
    info: 'create: omitting the data throws E_DATA_EMPTY',
  },
  {
    fn: tryCatch(crypto.hash.create, 23),
    expect: is.error,
    info: 'create: omitting the data throws',
  },
  {
    fn: tryCatch(crypto.hash.create, 23),
    expect: t => t.name === 'E_DATA_TYPE',
    info: 'create: omitting the data throws E_DATA_TYPE',
  },
  {
    fn: crypto.hash.create('kinda long input string longer than 44 characers.', {
      algorithm: 'shake256',
      length: 32,
    }).hash,
    expect: is.length.eq(44),
    info: 'create: length can be specified',
  },
  {
    fn: crypto.hash.create('string', { algorithm: 'shake256' }).hash,
    expect: is.length.eq(32),
    info: 'create: length can be specified',
  },

  { fn: crypto.hash.check('testing', expectedHash.hash), expect: true },
  {
    fn: tryCatch(crypto.hash.check, 'testing'),
    expect: is.error,
    info: 'check: omitting the hash throws',
  },
  {
    fn: tryCatch(crypto.hash.check, 'testing'),
    expect: t => t.name === 'E_HASH_TYPE',
    info: 'check: omitting the hash throws E_HASH_TYPE',
  },
  {
    fn: tryCatch(crypto.hash.check, 'testing', ''),
    expect: t => t.name === 'E_HASH_EMPTY',
    info: 'check: passing an empty hash throws E_HASH_EMPTY',
  },
  {
    fn: tryCatch(crypto.hash.check, '', 'hash'),
    expect: is.error,
    info: 'check: omitting the data throws',
  },
  {
    fn: tryCatch(crypto.hash.check, 23, 'hash'),
    expect: t => t.name === 'E_DATA_TYPE',
    info: 'check: omitting the hash throws E_DATA_TYPE',
  },
  {
    fn: tryCatch(crypto.hash.check, '', 'hash'),
    expect: t => t.name === 'E_DATA_EMPTY',
    info: 'check: omitting the data throws E_DATA_EMPTY',
  },
]
