import crypto from 'crypto'

import { is } from '../../lib/index.mjs'

const libName = '@webboot/crypto.ecdh.'

export const encrypt = ({ aad = false, secret = '' }) => {
  if (!secret || !secret.length) {
    throw error({
      msg: `${libName}.encrypt: secret was not specified`,
      code: 'ENOSECRET',
    })
  }

  return props => {
    const { text } = props

    const nonce = crypto.randomBytes(12)

    if (!is.string(text) || is.empty(text)) {
      throw error({
        msg: `${libName}createCipher: need props.text to be a string with a length`,
        code: 'ETEXTNOSTRING',
      })
    }

    const cipher = crypto.createCipheriv('aes-192-ccm', secret, nonce, {
      authTagLength: 16,
    })

    if (aad) {
      if (isValidString(aad)) {
        aad = Buffer.from(aad, 'hex')
      }

      cipher.setAAD(aad, {
        plaintextLength: Buffer.byteLength(plaintext),
      })
    }

    const ciphertext = cipher.update(plaintext, 'utf8')
    cipher.final()

    const tag = cipher.getAuthTag()

    return { ciphertext, nonce, tag }
  }
}

export default encrypt
