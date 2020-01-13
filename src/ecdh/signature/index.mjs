import signer from './sign.mjs'
import verifier from './verify.mjs'

export const sign = signer
export const verify = verifier

export const signature = {
  sign,
  verify,
}

export default signature
