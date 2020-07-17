import { is } from '@magic/test'

import { word } from '../../src/random/word.mjs'

export default [{ fn: word, expect: is.string, info: 'returned word is a string' }]
