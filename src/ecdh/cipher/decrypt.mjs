import crypto from 'crypto'

import { is, error } from '../../lib/index.mjs'

import hash from '../../hash.mjs'

const libName = `@webboot/crypto.ecdh.cipher.decrypt`

export const decrypt = props => {
  if (is.empty(props)) {
    throw error(
      `${libName}: function arguments have to be an object and be non-empty`,
      'E_PROPS_EMPTY',
    )
  }

  const { aad, nonce, tag, ciphertext } = props

  let { secret, algorithm = 'aes-256-cbc' } = props

  if (!is.buffer(ciphertext)) {
    throw error(`${libName}: ciphertext is not a buffer.`, 'E_CIPHERTEXT_TYPE')
  }

  if (is.empty(ciphertext)) {
    throw error(`${libName}: ciphertext is empty.`, 'E_CIPHERTEXT_EMPTY')
  }

  if (is.empty(secret)) {
    throw error(`${libName}: secret is empty`, 'E_SECRET_EMPTY')
  }

  if (!is.buffer(secret)) {
    throw error(`${libName}: secret is not a buffer.`, 'E_SECRET_TYPE')
  }

  if (is.empty(nonce)) {
    throw error(`${libName}: nonce is empty`, 'E_NONCE_EMPTY')
  }

  if (!is.buffer(nonce)) {
    throw error(`${libName}: nonce is not a buffer.`, 'E_NONCE_TYPE')
  }

  if (secret.length !== '32') {
    const hashed = hash.create(secret, { algorithm: 'shake256' })
    secret = hashed.hash.toString('base64')
  }

  let options = {}

  // if (!is.empty(tag) && !is.empty(aad)) {
  //   algorithm = 'aes-256-ccm'
  //   options.authTagLength = 16
  // }

  const decipher = crypto.createDecipheriv(algorithm, secret, nonce, options)

  // if (!is.empty(tag) && !is.empty(aad)) {
  //   decipher.setAuthTag(tag)

  //   decipher.setAAD(aad, {
  //     plaintextLength: ciphertext.length,
  //   })
  // }

  let result = decipher.update(ciphertext, null, 'utf8')

  result += decipher.final('utf8')

  return result
}

export default decrypt
