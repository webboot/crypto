import is from '@magic/types'

import number from './number.mjs'

const libName = '@webboot/crypto.random.numbers'

export const numbers = async count => {
  count = parseInt(count, 10)

  if (count !== count || count < 1) {
    throw new Error(`${libName} count: first arg has to be a positive number.`)
  }

  const nums = new Set()

  while (nums.size < count) {
    nums.add(await number())
  }

  return Array.from(nums)
}

export default numbers
