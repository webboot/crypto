import { is } from '../lib/index.mjs'
import { word } from './word.mjs'

const libName = '@webboot/crypto.random.words'

export const words = async count => {
  if (!is.integer(count)) {
    throw new Error(`${libName} count has to be an integer.`)
  }

  if (count < 1) {
    throw new Error(`${libName} count has to be a positive integer.`)
  }

  const words = new Set()

  while (words.size < count) {
    words.add(await word())
  }

  return Array.from(words)
}
