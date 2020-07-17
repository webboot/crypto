import crypto from 'crypto'

const libName = '@webboot/crypto.random.number'

const defaultArgs = {
  min: 0,
  max: 281474976710654,
}

export const number = async params => {
  try {
    const options = Object.assign({}, defaultArgs, params)
    let { min, max } = options

    const distance = max - min

    if (min > max) {
      const m = min
      min = max
      max = m
    }

    if (max > Number.MAX_SAFE_INTEGER) {
      throw new Error(
        `${libName}: Max number should be Number.MAX_SAFE_INTEGER too high by: ${
          max - Number.MAX_SAFE_INTEGER
        }`,
      )
    }

    if (distance > 281474976710655) {
      throw new Error(`${libName}: Distance is greater than 256^6-1 ${distance}`)
    }

    let subOnEnd = 0
    if (min < 0) {
      subOnEnd = min
      max += Math.abs(min)
      min = 0
    }

    let maxBytes = 6
    let maxDec = 281474976710656

    // Adjust maxBytes for small ranges
    if (distance < 256) {
      maxBytes = 1
      maxDec = 256
    } else if (distance < 65536) {
      maxBytes = 2
      maxDec = 65536
    } else if (distance < 16777216) {
      maxBytes = 3
      maxDec = 16777216
    } else if (distance < 4294967296) {
      maxBytes = 4
      maxDec = 4294967296
    } else if (distance < 1099511627776) {
      maxBytes = 4
      maxDec = 1099511627776
    }

    const byteString = await crypto.randomBytes(maxBytes).toString('hex')
    const randbytes = parseInt(byteString, 16)

    return Math.min(max, Math.floor((randbytes / maxDec) * (max - min + 1) + min + subOnEnd))
  } catch (e) {
    e.message = `${libName} ${e.message}`
    throw e
  }
}

export default number
