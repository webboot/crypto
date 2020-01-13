import crypto from 'crypto'

export const sign = priv => props => {
  const { algorithm = 'SHA256', data, inputEncoding, outputEncoding } = props

  const signee = crypto.createSign(algorithm)
  signee.update(data, inputEncoding)
  signee.end()
  const signature = signee.sign(priv, outputEncoding)

  return signature
}

export default sign
