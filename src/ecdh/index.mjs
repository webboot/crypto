import crypto from 'crypto'

import { is, error } from '../lib/index.mjs'

import { secret } from './secret.mjs'
import * as cipher from './cipher/index.mjs'

const libName = '@webboot/crypto.ecdh'

export const ecdh = (data, options = {}) => {
  const { encoding = false, curve = 'secp521r1', priv: returnPriv = false, aad } = options

  if (!is.string(data)) {
    throw error(`${libName}: data has to be a string. ${typeof data}`, 'E_DATA_WRONG_TYPE')
  }

  if (is.empty(data)) {
    throw error(`${libName}: data has to have a length.`, 'E_DATA_EMPTY')
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
  }

  if (returnPriv) {
    result.priv = priv
  }

  return result
}

export default ecdh
