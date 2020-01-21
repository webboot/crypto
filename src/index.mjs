import diffie from './ecdh/index.mjs'
import pgpgp from './gpg.mjs'
import hasher from './hash.mjs'

export const hash = hasher
export const ecdh = diffie
export const gpg = pgpgp
export const pgp = pgpgp

export default {
  hash,
  ecdh,
  gpg,
  pgp,
}
