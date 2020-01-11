import crypto from 'crypto'

import { isValidString } from './lib/index.mjs'

export const create = (str, algorithm = 'sha384') => {
  if (!isValidString(str)) {
    const err = new Error('@webboot/crypto.hashes.create: str was not a string or empty.')
    err.code = 'ESTREMPTY'
    throw err
  }

  const hashIt = crypto.createHash(algorithm)

  hashIt.update(str)

  const hash = hashIt.digest('base64')

  return {
    algorithm,
    hash,
  }
}

export const check = (str, hash) => {
  if (!isValidString(str)) {
    const err = new Error('@webboot/crypto.hashes.check: str was not a string or empty.')
    err.code = 'ESTREMPTY'
    throw err
  }

  if (!isValidString(hash)) {
    const err = new Error('@webboot/crypto.hashes.check: hash was not a string or empty.')
    err.code = 'EHASHEMPTY'
    throw err
  }

  const result = create(str)

  return hash === result.hash
}

export const verify = check

export default {
  check,
  create,
  verify,
}
