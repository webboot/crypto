import crypto from 'crypto'

import { is, error } from '../../lib/index.mjs'

import hash from '../../hash.mjs'

const libName = '@webboot/crypto.ecdh.'

export const encrypt = (props = {}) => {
  const { aad = false, algorithm = 'aes-256-cbc', data } = props
  let { secret = '' } = props

  if (!is.string(secret) && !is.buffer(secret)) {
    throw error(`${libName}encrypt: need props.secret to be a string or buffer`, 'E_SECRET_TYPE')
  }

  if (is.empty(secret)) {
    throw error(
      `${libName}encrypt: need props.secret to be non-empty`,
      'E_SECRET_EMPTY',
    )
  }

  if (secret.length !== '32') {
    const hashed = hash.create(secret, { algorithm: 'shake256' })
    secret = hashed.hash.toString('base64')
  }

  if (is.empty(data)) {
    throw error(
      `${libName}encrypt: need props.data to be a non-empty string or buffer.`,
      'E_DATA_EMPTY',
    )
  }

  const options = {}

  if (!is.empty(aad)) {
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

  const ciphered = cipher.update(data)

  const final = cipher.final()

  const ciphertext = Buffer.concat([ciphered, final])

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

export default encrypt
