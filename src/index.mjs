import diffie from './ecdh/index.mjs'
import pgpgp from './gpg.mjs'
import hasher from './hash.mjs'
import wordList from './wordlist.mjs'

export const hash = hasher
export const ecdh = diffie
export const gpg = pgpgp
export const pgp = pgpgp
export const wordlist = wordList

export default {
  hash,
  ecdh,
  gpg,
  pgp,
  wordlist,
}
