import { is, tryCatch } from '@magic/test'

import { gpg } from '../src/gpg.mjs'

let email = ''
let expectedKey = ''

const before = async () => {
  const pgpKeys = await gpg()
  const parsed = gpg.parseKeys(pgpKeys)

  const firstKey = Object.values(parsed)[0]
  console.log({ firstKey })

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
    expect: t => t.name === 'E_EXEC_STDERR',
    info: 'gpg returns E_EXEC_STDERR on shell error',
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
