import crypto from 'crypto'
import { is } from '../lib/index.mjs'

const libName = '@webboot/crypto.random.bytes'

const byteDefault = 33

export const bytes = byte =>
  new Promise((resolve, reject) => {
    byte = parseInt(byte, 10)

    if (!is.integer(byte)) {
      byte = byteDefault
    }

    crypto.randomBytes(byte, (err, buf) => {
      if (err) {
        err.message = `${libName} ${err.message}`
        reject(err)
      } else {
        resolve(buf.toString('hex'))
      }
    })
  })

export default bytes
