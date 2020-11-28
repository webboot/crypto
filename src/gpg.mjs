import child_process from 'child_process'

import { error } from './lib/error.mjs'

const libName = '@webboot/crypto.lib.gpg'

export const gpg = (cmd = '--list-keys', options = {}) =>
  new Promise((resolve, reject) => {
    if (!cmd.startsWith('gpg')) {
      cmd = `gpg ${cmd}`
    }

    child_process.exec(cmd, options, (err, stdout, stderr) => {
      const e = stderr || (err && err.message)
      if (e) {
        reject(error(`${libName}: ${cmd} error: ${e}`, 'E_EXEC_ERR'))
        return
      }

      let result = stdout.trim()
      if (options.parse === true) {
        result = gpg.parseKeys(result)
      } else if (typeof options.parse === 'function') {
        result = options.parse(result)
      }

      resolve(result)
    })
  })

gpg.parseKeys = string => {
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

      const capabilityMap = {
        S: 'Sign',
        C: 'Certify',
        E: 'Encrypt',
        A: 'Authenticate',
      }

      const cap = capabilities
        .substr(1, -1)
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

gpg.sign = async (key, recipient, message) =>
  new Promise((resolve, reject) => {
    const signer = child_process.spawn('gpg', ['--sign', '--detach-sig', '--armor', '-u', key])

    signer.stdin.write(message)
    signer.stdin.end()

    let response = ''

    signer.stdout.on('data', data => {
      response += data.toString()
    })

    signer.stderr.on('data', data => {
      reject(data.toString())
    })

    signer.on('exit', code => {
      if (code === 0) {
        resolve(response)
      } else {
        reject(response)
      }
    })
  })

gpg.export = key => child_process.execSync(`gpg --export --armor ${key}`).toString()

gpg.import = key =>
  new Promise((resolve, reject) => {
    const importer = child_process.spawn('gpg', ['--import'])

    importer.stdin.write(key)
    importer.stdin.end()

    let response = ''

    importer.stdout.on('data', data => {
      response += data.toString()
    })

    importer.stderr.on('data', data => {
      const response = data.toString()
      const exists = response.includes('not changed')

      if (exists) {
        resolve(response)
        return
      }

      reject(response)
    })

    importer.on('exit', code => {
      if (code === 0) {
        resolve(response)
      } else {
        const exists = response.includes('not changed')
        if (exists) {
          resolve(response)
          return
        }

        reject(response)
      }
    })
  })

gpg.verify = ({ sig, file }) =>
  new Promise((resolve, reject) => {
    console.log({ sig, file })
    const verifier = child_process.spawn('gpg', ['--verify', sig, file])

    let response = ''

    verifier.stdout.on('data', data => {
      response += data.toString()
    })

    verifier.stderr.on('data', data => {
      response += data.toString()
    })

    verifier.on('exit', code => {
      if (code === 0 || response.includes('Good Signature')) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })

export const pgp = gpg

export default gpg
