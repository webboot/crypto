import { is, tryCatch } from '@magic/test'

import ecdh from '../../../src/ecdh/index.mjs'

const encrypt = (pass, args) => {
  const diffie = ecdh(pass).cipher.encrypt(args)

  return diffie
}

const DIFFIE = ecdh('testing')

const encryptData = { data: 'testing', secret: 'testing', nonce: 'testing' }

export default [
  {
    fn: encrypt('testing', encryptData),
    expect: is.object,
    info: 'encrypt returns an object',
  },
  {
    fn: encrypt('testing', encryptData).ciphertext,
    expect: t => !is.empty(t),
    info: 'encrypt return a non-empty ciphertext',
  },
  {
    fn: encrypt('testing', encryptData).nonce,
    expect: is.buffer,
    info: 'nonce is a buffer',
  },
  {
    fn: tryCatch(DIFFIE.cipher.encrypt),
    expect: is.error,
    info: 'calling encrypt without arguments errors',
  },
  {
    fn: tryCatch(DIFFIE.cipher.encrypt),
    expect: t => t.name === 'E_PROPS_EMPTY',
    info: 'calling encrypt without arguments errors with E_PROPS_EMPTY',
  },
  {
    fn: tryCatch(DIFFIE.cipher.encrypt, [1, 2, 3]),
    expect: t => t.name === 'E_PROPS_TYPE',
    info: 'calling encrypt without non-object args errors with E_PROPS_TYPE',
  },
  {
    fn: tryCatch(DIFFIE.cipher.encrypt, { data: '', secret: '' }),
    expect: is.error,
    info: 'calling encrypt with invalid data errors',
  },
  {
    fn: tryCatch(DIFFIE.cipher.encrypt, { data: '' }),
    expect: t => t.name === 'E_SECRET_EMPTY',
    info: 'calling encrypt with invalid secret errors with E_SECRET_EMPTY',
  },
  {
    fn: tryCatch(DIFFIE.cipher.encrypt, { secret: 23 }),
    expect: t => t.name === 'E_SECRET_TYPE',
    info: 'calling encrypt with invalid secret errors with E_SECRET_TYPE',
  },
  {
    fn: tryCatch(DIFFIE.cipher.encrypt, { data: '', secret: 'testing' }),
    expect: t => t.name === 'E_DATA_EMPTY',
    info: 'calling encrypt with invalid data errors with E_DATA_EMPTY',
  },
  {
    fn: tryCatch(DIFFIE.cipher.encrypt, { data: 23, secret: 'testing' }),
    expect: t => t.name === 'E_DATA_TYPE',
    info: 'calling encrypt with invalid data errors with E_DATA_TYPE',
  },
]
