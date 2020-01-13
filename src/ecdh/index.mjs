import crypto from 'crypto'

import { is, error } from '../lib/index.mjs'

import { secret } from './secret.mjs'
import * as signature from './signature/index.mjs'
import * as cipher from './cipher/index.mjs'

const libName = '@webboot/crypto.ecdh'

export const ecdh = (data, options = {}) => {
  const { encoding = false, curve = 'secp521r1', priv: returnPriv = false, aad } = options

  if (!is.string(data) || is.empty(data)) {
    throw error({
      msg: `${libName}: data has to be a string with a length. ${typeof data}`,
      code: 'ENOTASTRING',
    })
  }

  const generator = crypto.createECDH(curve)

  let priv = crypto
    .createHash('sha256')
    .update(data, 'utf8')
    .digest()

  generator.setPrivateKey(priv)

  let pub = generator.getPublicKey()

  if (encoding) {
    pub = pub.toString(encoding)
    priv = priv.toString(encoding)
  }

  const result = {
    pub,
    curve,
    secret: secret(generator),
    cipher: {
      ...cipher,
      encrypt: cipher.encrypt({ aad, secret: priv }),
    },
    signature: {
      ...signature,
      sign: signature.sign(priv),
    },
  }

  if (returnPriv) {
    result.priv = priv
  }

  return result
}

export default ecdh
