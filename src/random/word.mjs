import randomNumber from './number.mjs'

import wordlist from '../wordlist.mjs'

const params = {
  min: 0,
  max: wordlist.length - 1,
}

export const word = async () => wordlist[await randomNumber(params)]
