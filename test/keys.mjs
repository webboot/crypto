import { is, tryCatch } from '@magic/test'

import { keys } from '../src/index.mjs'

const expectedStrings384 = {
  curve: 'secp384r1',
  priv: 'z4DNiu1ILV0VJ9fccvzv+E5jJlkoSER9LcCw6H38mpA=',
  pub:
    'BHZJ27+0rNCqSuoUgrvQmu1DRDceGPcVdGuXniSl6J4M0hLstQmUaSLZ4W4rT99VGml/WIx2iLbdv/taiJMeLu15VFI8HNEefZv2NAhKS8TkffVFP2OUXco1kfd3R/C0IQ==',
}

const expectedStrings521 = {
  curve: 'secp521r1',
  priv: 'z4DNiu1ILV0VJ9fccvzv+E5jJlkoSER9LcCw6H38mpA=',
  pub:
    'BABaOO1o9+lo8k5Akt7cITuVllmCBk/jOKMrzn6G90oKWsw6EezuviN/aJWI9RXPo05VsmZ9erMeyjjjyOB/ZJqgCwASgqouSzClbj/amxhoW0XXVK/k3f7rCqiI66tAt39u4YFxY/92SItX9qU9fXid9WqfpZlrQcn7TfNW+VTJDbvZYA==',
}

export default [
  { fn: keys('testing'), expect: is.object, info: '@webboot/crypto.keys returns an object' },
  {
    fn: keys('testing', { priv: true }).priv,
    expect: is.buffer,
    info: '@webboot/crypto.keys .priv is a buffer',
  },
  {
    fn: keys('testing').priv,
    expect: is.undefined,
    info: '@webboot/crypto.keys .priv is undefined by default',
  },
  { fn: keys('testing').pub, expect: is.buffer, info: '@webboot/crypto.keys .pub is a buffer' },
  {
    fn: keys('testing', { encoding: 'base64', priv: true }).priv,
    expect: is.string,
    info: '@webboot/crypto.keys .priv is a string if requested',
  },
  {
    fn: keys('testing', { encoding: 'base64', priv: true }).pub,
    expect: is.string,
    info: '@webboot/crypto.keys .pub is a string if requested',
  },
  {
    fn: keys('testing').priv,
    expect: undefined,
    info: '@webboot/crypto.keys does not return priv key without priv option',
  },
  {
    fn: tryCatch(keys),
    expect: is.error,
    info: '@webboot/crypto.keys without arguments errors',
  },
  {
    fn: tryCatch(keys, 1),
    expect: is.error,
    info: '@webboot/crypto.keys with number as first argument errors',
  },
  {
    fn: tryCatch(keys, () => {}),
    expect: is.error,
    info: '@webboot/crypto.keys with function as first argument errors',
  },

  {
    fn: tryCatch(keys, ''),
    expect: is.error,
    info: '@webboot/crypto.keys with empty string as first argument errors',
  },

  // returned strings
  {
    fn: keys('testing', { encoding: 'base64', curve: 'secp384r1' }).pub,
    expect: expectedStrings384.pub,
    info: '@webboot/crypto.keys returned 384 .pub equals expectedStrings.pub',
  },
  {
    fn: keys('testing', { encoding: 'base64', curve: 'secp384r1', priv: true }).priv,
    expect: expectedStrings384.priv,
    info: '@webboot/crypto.keys returned 384 .priv equals expectedStrings.priv',
  },
  {
    fn: keys('testing', { encoding: 'base64' }).pub,
    expect: expectedStrings521.pub,
    info: '@webboot/crypto.keys returned 521 .pub equals expectedStrings.pub',
  },
  {
    fn: keys('testing', { encoding: 'base64', priv: true }).priv,
    expect: expectedStrings521.priv,
    info: '@webboot/crypto.keys returned 521 .priv equals expectedStrings.priv',
  },

  // returned buffers
  {
    fn: keys('testing', { curve: 'secp384r1' }).pub,
    expect: () => Buffer.from(expectedStrings384.pub, 'base64'),
    info: '@webboot/crypto.keys curve 384 key pub buffers match',
  },
  {
    fn: keys('testing').pub,
    expect: Buffer.from(expectedStrings521.pub, 'base64'),
    info: '@webboot/crypto.keys curve 521 key pub buffers match',
  },

  // returned curves
  {
    fn: keys('testing').curve,
    expect: 'secp521r1',
    info: 'default curve is secp521r1',
  },
  {
    fn: keys('testing', { curve: 'secp384r1' }).curve,
    expect: 'secp384r1',
    info: 'curve secp384r1 can be used',
  },
  {
    fn: tryCatch(keys, 'testing', { curve: 'notACurveAtAll' }),
    expect: is.error,
    info: 'unknown curves throw an error',
  },
]
