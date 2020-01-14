import crypto from 'crypto'

import { is, error } from '../../lib/index.mjs'

const libName = `@webboot/crypto.ecdh.cipher.decrypt`

export const decrypt = ({ aad, nonce, tag, ciphertext, secret, algorithm = 'aes-256-cbc' }) => {
  if (is.empty(ciphertext)) {
    throw error(`${libName}: ciphertext was empty.`, 'E_NO_CIPHERTEXT')
  }

  if (is.empty(secret)) {
    throw error(`${libName}: secret was empty`, 'E_NO_SECRET')
  }

  if (is.empty(nonce)) {
    throw error(`${libName}: nonce was empty`, 'E_NO_NONCE')
  }

  let options = {}
  if (tag && aad) {
    algorithm = 'aes-256-ccm'
    options.authTagLength = 16
  }

  const decipher = crypto.createDecipheriv(algorithm, secret, nonce, options)

  if (tag && aad) {
    decipher.setAuthTag(tag)

    decipher.setAAD(aad, {
      plaintextLength: ciphertext.length,
    })
  }

  const result = decipher.update(ciphertext, null, 'utf8')

  try {
    result += decipher.final()
  } catch (e) {
    const err = new Error('Authentication failed')
    err.code = 'E_AUTH_FAIL'
    throw err
  }

  return result
}

export default decrypt
