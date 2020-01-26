import { is } from '@magic/test'

import wordlist from '../src/wordlist.mjs'

export default [
  { fn: () => wordlist.length, expect: 7777, info: 'test for wordlist length' },
  {
    fn: () => wordlist.length,
    expect: new Set(wordlist).size,
    info: 'test for uniqueness',
  },
  {
    fn: () => wordlist.map(is.string).length,
    expect: 7777,
    info: 'test if all words are strings',
  },
  {
    fn: () => wordlist.filter(is.empty).length,
    expect: 0,
    info: 'test if no word is empty',
  },
  {
    fn: () => wordlist.filter(t => t.length < 3).length,
    expect: 0,
    info: 'test that all words are longer than 3 chars',
  },
]
