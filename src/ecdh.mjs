import crypto from 'crypto'

import { isValidString } from './lib/index.mjs'

export const ecdh = (secret, options = {}) => {
  const { encoding = false, curve = 'secp521r1', priv: returnPriv = false } = options

  if (!isValidString(secret)) {
    const err = new Error(
      `@webboot/crypto.ecdh: secret has to be a string with a length. ${typeof secret}`,
    )
    err.code = 'ENOTASTRING'
    throw err
  }

  const generator = crypto.createECDH(curve)

  let priv = crypto
    .createHash('sha256')
    .update(secret, 'utf8')
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
  }

  if (returnPriv) {
    result.priv = priv
  }

  result.computeSecret = pub => {
    if (typeof pub === 'string') {
      pub = Buffer.from(pub)
    }

    return generator.computeSecret(pub)
  }

  return result
}

export default ecdh
