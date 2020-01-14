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

  return {
    alice,
    bob,
  }
}

export default [{ fn: decrypt, expect: is.object, info: 'decrypted return value is an object' }]
