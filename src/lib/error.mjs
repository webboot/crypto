import is from './is.mjs'

export const error = (msg, name = 'E_UNKNOWN') => {
  if (is.string(msg)) {
    msg = new Error(msg)
  }

  msg.name = name

  // clean stack
  // remove name, message, and first line of stack (which is this file)
  msg.stack = msg.stack
    .replace(msg.name, '')
    .replace(error.message, '')
    .split('\n')
    .filter((_, i) => i !== 1)
    .join('\n')

  return msg
}
