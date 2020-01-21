import child_process from 'child_process'

import { error } from './lib/error.mjs'

const libName = '@webboot/crypto.lib.exec'

// this always resolves, errors get handled if they get returned by awaited functions,
// not thrown

export const gpg = (cmd = '--list-keys', options = {}) =>
  new Promise((resolve, reject) => {
    if (!cmd.startsWith('gpg')) {
      cmd = `gpg ${cmd}`
    }

    child_process.exec(cmd, options, (err, stdout, stderr) => {
      let result = stdout.trim()

      if (err) {
        result = error(`${libName}: ${cmd} error: ${err.message}`, 'E_EXEC_ERR')
      }

      if (stderr) {
        result = error(`${libName}: ${cmd} error: ${stderr}`, 'E_EXEC_STDERR')
      }

      resolve(result)
    })
  })

export const pgp = gpg

export default gpg
