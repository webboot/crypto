import decryptor from './decrypt.mjs'
import encryptor from './encrypt.mjs'

export const decrypt = decryptor
export const encrypt = encryptor

export const cipher = {
  decrypt,
  encrypt,
}

export default cipher
