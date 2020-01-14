import crypto from 'crypto'
import { is, error } from '../lib/index.mjs'

const libName = '@webboot/crypto.ecdh.secret'

export const secret = generator => (pub, options = {}) => {
  if (is.empty(pub)) {
    throw error(`${libName}: pub has to be non empty. ${typeof pub}`, 'E_PUB_EMPTY')
  }

  const { outputEncoding = undefined } = options
  let { inputEncoding = undefined } = options

  if (typeof pub === 'string') {
    inputEncoding = 'base64'
  }

  return generator.computeSecret(pub, inputEncoding, outputEncoding)
}
