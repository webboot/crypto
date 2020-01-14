import crypto from 'crypto'

import { is, error } from './lib/index.mjs'

const libName = '@webboot/crypto.hashes'

export const create = (data, algorithm = 'sha384') => {
  if (!is.string(data) || is.empty(data)) {
    throw error(`${libName}.create: data was not a string or empty. ${typeof data}`, 'E_DATA_EMPTY')
  }

  const hashIt = crypto.createHash(algorithm)

  hashIt.update(data)

  const hash = hashIt.digest('base64')

  return {
    algorithm,
    hash,
  }
}

export const check = (data, hash, algorithm = 'sha384') => {
  if (!is.string(data) || is.empty(data)) {
    throw error(`${libName}.check: data was not a string or empty.`, 'E_DATA_EMPTY')
  }

  if (!is.string(hash) || is.empty(hash)) {
    throw error(`${libName}.check: hash was not a string or empty.`, 'E_HASH_EMPTY')
  }

  const result = create(data, algorithm)

  return hash === result.hash
}

export const verify = check

export const hash = {
  check,
  create,
  verify,
}

export default hash
