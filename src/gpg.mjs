import child_process from 'child_process'

import { error } from './lib/error.mjs'

const libName = '@webboot/crypto.lib.exec'

// this always resolves.
// errors get handled if they get returned by awaited functions.
export const gpg = (cmd = '--list-keys', options = {}) =>
  new Promise(resolve => {
    if (!cmd.startsWith('gpg')) {
      cmd = `gpg ${cmd}`
    }

    child_process.exec(cmd, options, (err, stdout, stderr) => {
      const e = stderr || err && err.message
      if (e) {
        resolve(error(`${libName}: ${cmd} error: ${e}`, 'E_EXEC_ERR'))
        return
      }

      let result = stdout.trim()
      if (options.parse === true) {
        result = parseKeys(result)
      } else if (typeof options.parse === 'function') {
        result = options.parse(result)
      }

      resolve(result)
    })
  })

const parseKeys = string => {
  const keys = {}
  let currentKey = ''

  string.split('\n').map((line, i, lines) => {
    line = line.trim()
    if (!line) {
      return
    }

    if (line.startsWith('pub')) {
      // new key
      currentKey = lines[i + 1].trim()

      const [_, algorithm, date, capabilities, _1, expires] = line.split(' ').filter(a => a)

      const capabilityMap =  {
        S: 'Sign',
        C: 'Certify',
        E: 'Encrypt',
        A: 'Authenticate',
      }

      const cap = capabilities.substr(1, -1)
        .split('')
        .map(a => capabilityMap[a])

      keys[currentKey] = {
        algorithm,
        cap,
        date,
        expires: expires && expires.replace(']', ''),
        key: currentKey,
        sub: [],
        users: [],
      }
    } else if (line.startsWith('uid')) {
      const [cap, rest] = line
        .replace('uid', '')
        .trim()
        .split(']')
        .filter(a => a)

      const [name, email] = rest.split(' <')

      keys[currentKey].users.push({
        name: name.trim(),
        cap: cap.replace('[', '').trim(),
        email: email.replace('>', ''),
      })
    }
  })

  return keys
}

gpg.parseKeys = parseKeys

export const pgp = gpg

export default gpg
