import { is, tryCatch } from '@magic/test'

import { numbers } from '../../src/random/index.mjs'

export default [
  {
    fn: async () => await numbers(1),
    expect: is.len.eq(1),
    info: 'asking for one number returns one number',
  },
  { fn: async () => await numbers(1), expect: is.array, info: 'returns an array' },
  {
    fn: async () => await numbers(10),
    expect: is.len.eq(10),
    info: 'returns correct number of numbers',
  },
  {
    fn: tryCatch(numbers),
    expect: t => t.message.includes('first arg has to be a positive'),
    info: 'needs arguments or errors',
  },
  {
    fn: async () => new Set(await numbers(10)),
    expect: is.len.eq(10),
    info: 'returns array of unique numbers',
  },
  { fn: tryCatch(numbers, -1), expect: is.error, info: 'negative count arg errors' },
  { fn: async () => await numbers(10, [1, 2, 3]), expect: is.len.eq(10) },
  { fn: async () => await numbers(3, 3), expect: is.len.eq(3) },
  { fn: async () => await numbers(3, 3), expect: t => t.every(is.num) },
]
