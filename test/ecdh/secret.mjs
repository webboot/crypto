import { is, tryCatch } from '@magic/test'

import crypto, { ecdh } from '../../src/index.mjs'

const expectedSecret384 = 'Io6Zts7zcgM/m2dKKuKGVuxvEL7M4DtNKMI2xSGt7jx1Mx0KB2g1D2DuvLkC9V92'
const expectedSecret521 =
  'AMzlX0KY0C8VHynGH98PD2Y+hY1GHA0batmsk7iYuNNEFUCsgrPPnie84tg1WBiI8x13ZQHnxep4s+am/Ggx8yUO'

const createSecrets = () => {
  const priv = {
    alice: crypto.hash.create('Alice: DOES NOT get hashed by ecdh.'),
    bob: crypto.hash.create('Bob: DOES NOT get hashed by ecdh.'),
    eve: crypto.hash.create('Eve: DOES NOT get hashed by ecdh.'),
    lilith: crypto.hash.create('Lilith: DOES NOT get hashed by ecdh.'),
  }

  const gen = {
    alice: ecdh(priv.alice.hash),
    bob: ecdh(priv.bob.hash),
    eve: ecdh(priv.eve.hash),
    lilith: ecdh(priv.lilith.hash),
  }

  const secret = {
    alice: gen.alice.secret(gen.bob.pub),
    bob: gen.bob.secret(gen.alice.pub),
    eve: gen.eve.secret(gen.lilith.pub),
    lilith: gen.lilith.secret(gen.eve.pub),
  }

  return secret
}

const createAlice = () => {
  const alicePriv = crypto.hash.create('Alice Hash Source')
  const gen = ecdh(alicePriv)
  return gen
}

export default [
  {
    fn: () => ecdh('testing').secret,
    expect: is.fn,
    info: 'secret is a function',
  },
  {
    fn: tryCatch(ecdh('testing').secret),
    expect: is.error,
    info: 'secret needs an argument',
  },
  {
    fn: tryCatch(ecdh('testing').secret),
    expect: t => t.name === 'E_PUB_EMPTY',
    info: 'secret needs an argument',
  },
  {
    fn: ecdh('testing').secret(ecdh('testing').pub),
    expect: is.buffer,
    info: 'secret works if given a public key as argument',
  },
  {
    fn: ecdh('testing', { curve: 'secp384r1' })
      .secret(ecdh('testing2', { curve: 'secp384r1' }).pub)
      .toString('base64'),
    expect: expectedSecret384,
    info: 'secret works if given a public key as argument',
  },

  {
    fn: ecdh('testing')
      .secret(ecdh('testing2').pub)
      .toString('base64'),
    expect: expectedSecret521,
    info: 'secret works if given a public key as argument',
  },
  {
    fn: ecdh('testing')
      .secret(ecdh('testing2').pub.toString('base64'))
      .toString('base64'),
    expect: expectedSecret521,
    info: 'secret works if given a string as secret',
  },

  {
    fn: createSecrets,
    expect: ({ alice, bob }) => is.deep.eq(alice, bob),
    info: 'alice and bob share the same secret',
  },
  {
    fn: createSecrets,
    expect: ({ eve, lilith }) => is.deep.eq(eve, lilith),
    info: 'eve and lilith share the same secret',
  },
  {
    fn: createSecrets,
    expect: ({ alice, eve }) => is.deep.diff(alice, eve),
    info: 'alice and eve do not share the same secret',
  },
  {
    fn: createSecrets,
    expect: ({ bob, eve }) => is.deep.diff(bob, eve),
    info: 'bob and eve do not share the same secret',
  },
  {
    fn: createSecrets,
    expect: ({ alice, lilith }) => is.deep.diff(alice, lilith),
    info: 'alice and lilith do not share the same secret',
  },
  {
    fn: createSecrets,
    expect: ({ bob, lilith }) => is.deep.diff(bob, lilith),
    info: 'bob and lilith do not share the same secret',
  },
]
