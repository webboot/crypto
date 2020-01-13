import crypto from 'crypto'

import { is } from '../../lib/index.mjs'

export const decrypt = ({ aad, nonce, tag, data, secret, algorithm = 'aes-192-ccm' }) => {
  if (is.empty(data)) {
    const err = new Error('@webboot/crypto.ecdh.cipher.decrypt: data was empty.')
    err.CODE = 'ENOSTR'
    throw err
  }

  if (is.empty(secret)) {
    const err = new Error('@webboot/crypto.ecdh.cipher.decrypt: secret was empty')
    err.CODE = 'ENOSECRET'
    throw err
  }

  if (is.empty(nonce)) {
    const err = new Error('@webboot/crypto.ecdh.cipher.decrypt: nonce was empty')
    err.CODE = 'ENONONCE'
    throw err
  }

  const decipher = crypto.createDecipheriv(algorithm, secret, nonce, {
    authTagLength: 16,
  })

  if (tag && aad) {
    decipher.setAuthTag(tag)

    decipher.setAAD(aad, {
      plaintextLength: data.length,
    })
  }

  const result = decipher.update(data, null, 'utf8')

  try {
    decipher.final()
  } catch (e) {
    const err = new Error('Authentication failed')
    err.code = 'EAUTHFAIL'
    throw err
  }

  return result
}

export default decrypt
