import crypto from 'crypto'

export const verify = (props = {}) => {
  const { algorithm = 'SHA256', data, pub, signature } = props

  if (is.empty(pub)) {
    throw error({
      msg: `${libName}.verify: pub has to be a non-empty value. ${typeof pub}`,
      code: 'EPUBEMPTY',
    })
  }

  const verify = crypto.createVerify(algorithm)
  verify.write(data)
  verify.end()

  const verified = verify.verify(pub, signature)

  return verified
}

export default verify
