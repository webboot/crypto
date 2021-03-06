import { is, tryCatch } from '@magic/test'

import crypto from '../src/index.mjs'

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

const expectedSecret384 = 'Io6Zts7zcgM/m2dKKuKGVuxvEL7M4DtNKMI2xSGt7jx1Mx0KB2g1D2DuvLkC9V92'
const expectedSecret521 =
  'AMzlX0KY0C8VHynGH98PD2Y+hY1GHA0batmsk7iYuNNEFUCsgrPPnie84tg1WBiI8x13ZQHnxep4s+am/Ggx8yUO'

export default [
  { fn: crypto.ecdh('testing'), expect: is.object, info: '@webboot/crypto.ecdh returns an object' },
  {
    fn: crypto.ecdh('testing', { priv: true }).priv,
    expect: is.buffer,
    info: '@webboot/crypto.ecdh .priv is a buffer',
  },
  {
    fn: crypto.ecdh('testing').priv,
    expect: is.undefined,
    info: '@webboot/crypto.ecdh .priv is undefined by default',
  },
  {
    fn: crypto.ecdh('testing').pub,
    expect: is.buffer,
    info: '@webboot/crypto.ecdh .pub is a buffer',
  },
  {
    fn: crypto.ecdh('testing', { encoding: 'base64', priv: true }).priv,
    expect: is.string,
    info: '@webboot/crypto.ecdh .priv is a string if requested',
  },
  {
    fn: crypto.ecdh('testing', { encoding: 'base64', priv: true }).pub,
    expect: is.string,
    info: '@webboot/crypto.ecdh .pub is a string if requested',
  },
  {
    fn: crypto.ecdh('testing').priv,
    expect: undefined,
    info: '@webboot/crypto.ecdh does not return priv key without priv option',
  },
  {
    fn: tryCatch(crypto.ecdh),
    expect: is.error,
    info: '@webboot/crypto.ecdh without arguments errors',
  },
  {
    fn: tryCatch(crypto.ecdh, 1),
    expect: is.error,
    info: '@webboot/crypto.ecdh with number as first argument errors',
  },
  {
    fn: tryCatch(crypto.ecdh, () => {}),
    expect: is.error,
    info: '@webboot/crypto.ecdh with function as first argument errors',
  },
  {
    fn: tryCatch(crypto.ecdh, ''),
    expect: is.error,
    info: '@webboot/crypto.ecdh with empty string as first argument errors',
  },

  // returned strings
  {
    fn: crypto.ecdh('testing', { encoding: 'base64', curve: 'secp384r1' }).pub,
    expect: expectedStrings384.pub,
    info: '@webboot/crypto.ecdh returned 384 .pub equals expectedStrings.pub',
  },
  {
    fn: crypto.ecdh('testing', { encoding: 'base64', curve: 'secp384r1', priv: true }).priv,
    expect: expectedStrings384.priv,
    info: '@webboot/crypto.ecdh returned 384 .priv equals expectedStrings.priv',
  },
  {
    fn: crypto.ecdh('testing', { encoding: 'base64' }).pub,
    expect: expectedStrings521.pub,
    info: '@webboot/crypto.ecdh returned 521 .pub equals expectedStrings.pub',
  },
  {
    fn: crypto.ecdh('testing', { encoding: 'base64', priv: true }).priv,
    expect: expectedStrings521.priv,
    info: '@webboot/crypto.ecdh returned 521 .priv equals expectedStrings.priv',
  },

  // returned buffers
  {
    fn: crypto.ecdh('testing', { curve: 'secp384r1' }).pub,
    expect: () => Buffer.from(expectedStrings384.pub, 'base64'),
    info: '@webboot/crypto.ecdh curve 384 key pub buffers match',
  },
  {
    fn: crypto.ecdh('testing').pub,
    expect: Buffer.from(expectedStrings521.pub, 'base64'),
    info: '@webboot/crypto.ecdh curve 521 key pub buffers match',
  },

  // returned curves
  {
    fn: crypto.ecdh('testing').curve,
    expect: 'secp521r1',
    info: 'default curve is secp521r1',
  },
  {
    fn: crypto.ecdh('testing', { curve: 'secp384r1' }).curve,
    expect: 'secp384r1',
    info: 'curve secp384r1 can be used',
  },
  {
    fn: tryCatch(crypto.ecdh, 'testing', { curve: 'notACurveAtAll' }),
    expect: is.error,
    info: 'unknown curves throw an error',
  },
]
