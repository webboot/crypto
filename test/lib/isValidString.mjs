import * as lib from '../../src/lib/index.mjs'
import { isValidString } from '../../src/lib/isValidString.mjs'

export default [
  {
    fn: isValidString.toString(),
    expect: lib.isValidString.toString(),
    info: 'lib/index.mjs and lib/isValidString.mjs export the same function',
  },
  {
    fn: isValidString('t'),
    expect: true,
    info: 'strings are valid even if their lenght is only 1 char',
  },
  {
    fn: isValidString(''),
    expect: false,
    info: 'empty strings are not valid strings',
  },
  {
    fn: isValidString(1),
    expect: false,
    info: 'numbers are not valid strings',
  },
  {
    fn: isValidString([]),
    expect: false,
    info: 'arrays are not valid strings',
  },
]
