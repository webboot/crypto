import sha from './hash.mjs'
import diffie from './ecdh/index.mjs'

export const hash = sha
export const ecdh = diffie

export default {
  hash,
  ecdh,
}
