import { is, tryCatch } from '@magic/test'

import ecdh from '../../../src/ecdh/index.mjs'

const decrypt = () => {
  const alice = {
    ecdh: ecdh('alice'),
  }

  const bob = {
    ecdh: ecdh('bob'),
  }

  bob.secret = bob.ecdh.secret(alice.ecdh.pub)
  alice.secret = alice.ecdh.secret(bob.ecdh.pub)

  bob.encrypted = bob.ecdh.cipher.encrypt({ data: 'hi, alice.', secret: bob.secret })

  alice.decrypted = alice.ecdh.cipher.decrypt({ ...bob.encrypted, secret: alice.secret })

  return alice.decrypted.toString('utf8')
}

const DIFFIE = ecdh('testing')

export default [
  {
    fn: decrypt,
    expect: 'hi, alice.',
    info: 'decrypted return value is the same as the encrypted value',
  },
  {
    fn: tryCatch(DIFFIE.cipher.decrypt),
    expect: is.error,
    info: 'decrypt without arguments errors',
  },
  {
    fn: tryCatch(DIFFIE.cipher.decrypt),
    expect: t => t.name === 'E_PROPS_EMPTY',
    info: 'decrypt without arguments errors',
  },
  {
    fn: tryCatch(DIFFIE.cipher.decrypt, { ciphertext: 'testing' }),
    expect: t => t.name === 'E_CIPHERTEXT_TYPE',
    info: 'decrypt with ciphertext string errors',
  },
  {
    fn: tryCatch(DIFFIE.cipher.decrypt, { ciphertext: Buffer.from('') }),
    expect: t => t.name === 'E_CIPHERTEXT_EMPTY',
    info: 'decrypt with empty ciphertext errors',
  },
  {
    fn: tryCatch(DIFFIE.cipher.decrypt, { ciphertext: Buffer.from('testing') }),
    expect: t => t.name === 'E_SECRET_EMPTY',
    info: 'decrypt without secret errors with E_SECRET_EMPTY',
  },
  {
    fn: tryCatch(DIFFIE.cipher.decrypt, { ciphertext: Buffer.from('testing'), secret: 23 }),
    expect: t => t.name === 'E_SECRET_TYPE',
    info: 'decrypt with invalid secret errors with E_SECRET_TYPE',
  },
  {
    fn: tryCatch(DIFFIE.cipher.decrypt, {
      ciphertext: Buffer.from('testing'),
      secret: Buffer.from('testing'),
    }),
    expect: t => t.name === 'E_NONCE_EMPTY',
    info: 'decrypt with empty nonce errors with E_NONCE_EMPTY',
  },
  {
    fn: tryCatch(DIFFIE.cipher.decrypt, {
      ciphertext: Buffer.from('testing'),
      secret: Buffer.from('testing'),
      nonce: 'testing',
    }),
    expect: t => t.name === 'E_NONCE_TYPE',
    info: 'decrypt with invalid nonce errors with E_NONCE_TYPE',
  },
]
