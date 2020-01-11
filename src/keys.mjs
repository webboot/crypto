import crypto from 'crypto'

import { isValidString } from './lib/index.mjs'

export const keys = (secret, options = {}) => {
  const { encoding = false, curve = 'secp521r1', priv: returnPriv = false } = options

  if (!isValidString(secret)) {
    const err = new Error(
      `@webboot/crypto.keys: secret has to be a string with a length. ${typeof secret}`,
    )
    err.code = 'ENOTASTRING'
    throw err
  }

  const generator = crypto.createECDH(curve)

  generator.setPrivateKey(
    crypto
      .createHash('sha256')
      .update(secret, 'utf8')
      .digest(),
  )

  let pub = generator.getPublicKey()
  let priv = generator.getPrivateKey()

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

  return result
}

export default keys
