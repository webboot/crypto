import crypto from 'crypto'

const libName = '@webboot/crypto.random.bytes'

const byteDefault = 33

export const bytes = byte =>
  new Promise((resolve, reject) => {
    byte = parseInt(byte, 10)

    if (typeof byte !== 'number' || parseInt(byte) !== parseInt(byte)) {
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
