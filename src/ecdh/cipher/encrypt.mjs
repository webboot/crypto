import crypto from 'crypto'

import { is, error } from '../../lib/index.mjs'

import hash from '../../hash.mjs'

const libName = '@webboot/crypto.ecdh.'

export const encrypt = props => {
  if (is.empty(props)) {
    throw error(`${libName}encrypt: props has to be non empty`, 'E_PROPS_EMPTY')
  }

  if (!is.object(props)) {
    throw error(`${libName}encrypt: props has to be an Object`, 'E_PROPS_TYPE')
  }

  const { aad = false, algorithm = 'aes-256-cbc', data } = props
  let { secret = '' } = props

  if (is.empty(secret)) {
    throw error(`${libName}encrypt: props.secret has to be non-empty.`, 'E_SECRET_EMPTY')
  }

  if (!is.string(secret) && !is.buffer(secret)) {
    throw error(
      `${libName}encrypt: props.secret has to be a buffer or string. ${typeof secret}`,
      'E_SECRET_TYPE',
    )
  }

  if (secret.length !== '32') {
    const hashed = hash.create(secret, { algorithm: 'shake256' })
    secret = hashed.hash.toString('base64')
  }

  if (is.empty(data)) {
    throw error(`${libName}encrypt: props.data has be non-empty.`, 'E_DATA_EMPTY')
  }

  if (!is.string(data) && !is.buffer(data)) {
    throw error(`${libName}encrypt: props.data has to be a string or buffer`, 'E_DATA_TYPE')
  }

  const options = {}

  // if (!is.empty(aad)) {
  //   algorithm = 'aes-256-ccm'
  //   options.authTagLength = 16
  // }

  const nonce = crypto.randomBytes(16)

  const cipher = crypto.createCipheriv(algorithm, secret, nonce, options)

  // if (!is.empty(aad)) {
  //   cipher.setAAD(aad, {
  //     plaintextLength: Buffer.byteLength(data),
  //   })
  // }

  const ciphered = cipher.update(data)

  const final = cipher.final()

  const ciphertext = Buffer.concat([ciphered, final])

  const result = {
    algorithm,
    ciphertext,
    nonce,
  }

  // if (!is.empty(aad)) {
  //   result.tag = cipher.getAuthTag()
  // }

  return result
}

export default encrypt
