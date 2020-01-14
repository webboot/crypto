import { is, tryCatch } from '@magic/test'

import ecdh from '../../../src/ecdh/index.mjs'

const encrypt = (pass, args) => {
  const diffie = ecdh(pass).cipher.encrypt(args)

  return diffie
}

const DIFFIE = ecdh('testing')

const encryptData = { data: 'testing', secret: 'testing' }

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
]
