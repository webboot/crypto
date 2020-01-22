import { is, tryCatch } from '@magic/test'

import { gpg } from '../src/gpg.mjs'

let email = ''
let expectedKey = ''

const before = async () => {
  const pgpKeys = await gpg()
  const parsed = gpg.parseKeys(pgpKeys)

  const firstKey = Object.values(parsed)[0]

  const user = firstKey.users[0]
  email = user.email
  expectedKey = firstKey.key

  if (!email) {
    throw new Error('email could not be found in gpg keyring.')
  }
}

export default [
  {
    fn: gpg,
    expect: is.string,
    info: 'gpg without arguments returns a string of gpg keys',
  },
  {
    fn: is.promise(gpg()),
    expect: true,
    info: 'gpg returns a promise if not awaited',
  },
  {
    fn: gpg('--list-keys', { parse: true }),
    expect: t => is.string(Object.values(t)[0].algorithm),
    info: 'gpg can parse keys before returning them and get the algorithm',
  },
  {
    fn: gpg('--list-keys', { parse: gpg.parseKeys }),
    expect: async t1 => {
      const t2 = await gpg('--list-keys', { parse: true })
      const tt1 = Object.values(t1)[0]
      const tt2 = Object.values(t2)[0]

      return is.deep.eq(tt1, tt2)
    },
    info: 'gpg can parse using a function',
  },
  {
    fn: gpg('--list-keys', { parse: true }),
    expect: t => is.array(Object.values(t)[0].users),
    info: 'gpg can parse keys before returning them and get the users',
  },
  {
    fn: gpg('--list-keys && exit 1'),
    expect: is.error,
    info: 'gpg returns an error on shell error',
  },
  {
    fn: gpg('--list-keys && exit 1'),
    expect: t => t.name === 'E_EXEC_ERR',
    info: 'gpg returns E_EXEC_ERR on shell error',
  },
  {
    fn: gpg('--not-a-command-for-sure'),
    expect: is.error,
    info: 'gpg returns an error on shell stderr',
  },
  {
    fn: gpg('--not-a-command-for-sure'),
    expect: t => t.name === 'E_EXEC_ERR',
    info: 'gpg returns E_EXEC_ERR on shell error',
  },
  {
    fn: async () => {
      const cmd = `--list-keys ${email}`
      const result = await gpg(cmd)
      const parsed = gpg.parseKeys(result)
      return Object.values(parsed)[0]
    },
    expect: t => t.key === expectedKey,
    before,
    info: 'node > gpg > node then parseKeys works for public key',
  },
  {
    fn: async () => {
      const cmd = `--list-keys ${expectedKey}`
      const result = await gpg(cmd)
      const parsed = gpg.parseKeys(result)
      return Object.values(parsed)[0]
    },
    expect: t => t.key === expectedKey,
    before,
    info: 'node > gpg > node then parseKeys works for public key',
  },

  {
    fn: async () => {
      const cmd = `--list-keys ${expectedKey}`
      const result = await gpg(cmd)
      const parsed = gpg.parseKeys(result)
      return Object.values(parsed)[0]
    },
    expect: t => t.key === expectedKey,
    before,
    info: 'node > gpg > node then parseKeys works for public key',
  },
]
