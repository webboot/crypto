import crypto from 'crypto'

import { is, error } from './lib/index.mjs'

const libName = '@webboot/crypto.hashes'

export const create = (data, options = {}) => {
  const { algorithm = 'sha384', length = 24 } = options

  if (is.string(data)) {
    data = Buffer.from(data)
  }

  if (is.empty(data)) {
    throw error(`${libName}.create: data can not be empty.`, 'E_DATA_EMPTY')
  }

  if (!is.buffer(data)) {
    throw error(`${libName}.create: data must be a buffer.`, 'E_DATA_TYPE')
  }

  const opts = {}

  if (algorithm === 'shake256') {
    opts.outputLength = length
  }

  const hashIt = crypto.createHash(algorithm, opts)

  hashIt.update(data)

  const hash = hashIt.digest('base64')

  return {
    algorithm,
    hash,
  }
}

export const check = (data, hash, options = {}) => {
  const { algorithm = 'sha384' } = options

  if (!is.string(data)) {
    throw error(`${libName}.check: data was not a string.`, 'E_DATA_TYPE')
  }

  if (is.empty(data)) {
    throw error(`${libName}.check: data can not be empty.`, 'E_DATA_EMPTY')
  }

  if (!is.string(hash)) {
    throw error(`${libName}.check: hash was not a string or empty.`, 'E_HASH_TYPE')
  }

  if (is.empty(hash)) {
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
