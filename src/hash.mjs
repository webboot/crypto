import crypto from 'crypto'

import { is, error } from './lib/index.mjs'

const libName = '@webboot/crypto.hashes'

export const create = (str, algorithm = 'sha384') => {
  if (!is.string(str) || is.empty(str)) {
    throw error({
      msg: `${libName}.create: str was not a string or empty. ${typeof str}`,
      code: 'ESTREMPTY',
    })
  }

  const hashIt = crypto.createHash(algorithm)

  hashIt.update(str)

  const hash = hashIt.digest('base64')

  return {
    algorithm,
    hash,
  }
}

export const check = (str, hash, algorithm = 'sha384') => {
  if (!is.string(str) || is.empty(str)) {
    throw error({
      msg: `${libName}.check: str was not a string or empty.`,
      code: 'ESTREMPTY',
    })
  }

  if (!is.string(hash) || is.empty(hash)) {
    throw error({
      msg: `${libName}.check: hash was not a string or empty.`,
      code: 'EHASHEMPTY',
    })
  }

  const result = create(str, algorithm)

  return hash === result.hash
}

export const verify = check

export const hash = {
  check,
  create,
  verify,
}

export default hash
