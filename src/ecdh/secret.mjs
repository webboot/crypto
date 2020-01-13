import crypto from 'crypto'
import { is, error } from '../lib/index.mjs'

const libName = '@webboot/crypto.ecdh.secret'

export const secret = generator => (pub, options = {}) => {
  if (is.empty(pub)) {
    throw error({
      msg: `${libName}: pub has to be a public key with a length. ${typeof pub}`,
      code: 'EPUBEMPTY',
    })
  }

  const { outputEncoding = undefined } = options
  let { inputEncoding = undefined } = options

  if (typeof pub === 'string') {
    inputEncoding = 'base64'
  }

  return generator.computeSecret(pub, inputEncoding, outputEncoding)
}
