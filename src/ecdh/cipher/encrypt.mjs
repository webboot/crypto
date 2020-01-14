import crypto from 'crypto'

import { is, error } from '../../lib/index.mjs'

const libName = '@webboot/crypto.ecdh.'

export const encrypt = ({ aad = false,  secret = '' }) => {
  if (is.empty(secret)) {
    throw error(
      `${libName}createCipher: need props.secret to be a non-empty string or buffer`,
      'E_SECRET_EMPTY',
    )
  }

  return ({ data, algorithm = 'aes-256-cbc' }) => {
    if (is.empty(data)) {
      throw error(
        `${libName}createCipher: need props.data to be a non-empty string or buffer.`,
        'E_DATA_EMPTY',
      )
    }

    const options = {}

    if (aad) {
      algorithm = 'aes-256-ccm'
      options.authTagLength = 16
    }

    const nonce = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv(algorithm, secret, nonce, options)

    if (aad) {
      cipher.setAAD(aad, {
        plaintextLength: Buffer.byteLength(data),
      })
    }

    let ciphertext = cipher.update(data, 'utf8')
    ciphertext += cipher.final('base64')

    const result = {
      algorithm,
      ciphertext,
      nonce,
    }

    if (aad) {
      result.tag = cipher.getAuthTag()
    }

    return result
  }
}

export default encrypt
