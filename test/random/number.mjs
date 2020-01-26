import { is, tryCatch } from '@magic/test'

import { number } from '../../src/random/index.mjs'

const runs = process.env.RUNS || 1

const numbers = []

const UNSAFE_INTEGER = Number.MAX_SAFE_INTEGER + 1

export default [
  { fn: () => number({ max: 1 }), runs, expect: t => t >= 0 },
  { fn: () => number({ max: 1 }), runs, expect: t => t <= 1 },
  // numbers stay in chosen bounds
  {
    fn: () => number({ min: 0, max: 1 }),
    runs,
    expect: t => t >= 0 && t <= 1,
  },
  {
    fn: () => number({ min: 4, max: 17 }),
    runs,
    expect: t => t >= 4 && t <= 17,
  },
  {
    fn: () => number({ min: 23, max: 32 }),
    runs,
    expect: t => t >= 23 && t <= 32,
  },
  {
    fn: () => number({ min: 4444441, max: 4444443 }),
    runs,
    expect: t => t >= 4444441 && t <= 4444443,
  },
  {
    fn: () => number({ min: 0, max: 255 }),
    runs,
    expect: t => t >= 0 && t <= 255,
  },
  {
    fn: () => number({ min: 0, max: 257 }),
    runs,
    expect: t => t >= 0 && t <= 257,
  },
  {
    fn: () => number({ min: 0, max: 65537 }),
    runs,
    expect: t => t >= 0 && t <= 65537,
  },
  {
    fn: () => number({ min: 0, max: 16777217 }),
    runs,
    expect: t => t >= 0 && t <= 16777217,
  },
  {
    fn: () => number({ min: 0, max: 4294967297 }),
    runs,
    expect: t => t >= 0 && t <= 4294967297,
  },
  {
    fn: () => number({ min: 0, max: 1099511627776 }),
    runs,
    expect: t => t >= 0 && t <= 1099511627776,
  },
  {
    fn: () => number({ min: -3, max: -1 }),
    runs,
    expect: t => t >= -3 && t <= -1,
  },
  {
    fn: () => number({ min: 2, max: 1 }),
    runs,
    expect: t => t >= 1 && t <= 2,
  },
  {
    fn: tryCatch(number, { min: -5, max: 281474976710655 }),
    runs,
    expect: is.error,
  },
  {
    fn: tryCatch(number, { min: -5, max: 281474976710655 }),
    runs,
    expect: e => e.message.includes('Distance is greater than 256^6-1'),
  },
  { fn: () => UNSAFE_INTEGER, expect: t => t > Number.MAX_SAFE_INTEGER },
  {
    fn: tryCatch(number, { min: 32000323, max: UNSAFE_INTEGER }),
    expect: is.error,
  },
  {
    fn: tryCatch(number, { min: 32000323, max: UNSAFE_INTEGER }),
    expect: e => e.message.includes('Max number should be Number.MAX_SAFE_INTEGER'),
  },
  // numbers will not equal each other
  { fn: () => number(), runs, expect: t => t !== number() },
  // are all return values numbers?
  { fn: () => number(), runs, expect: is.number },
  // no duplicates in array of RUNS numbers
  {
    fn: () => {
      numbers.push(number())
      return numbers
    },
    runs,
    expect: t => t.length === new Set(numbers).size,
  },
]
