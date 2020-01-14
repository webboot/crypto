import { is } from './is.mjs'

export const error = (msg, name = 'E_UNKNOWN') => {
  const err = new Error(msg)
  err.name = name

  // clean stack
  // remove name, message and first line of stack (which is this file)
  err.stack = err.stack
    .replace(err.name, '')
    .replace(error.message, '')
    .split('\n')
    .filter((_, i) => i !== 1)
    .join('\n')

  return err
}
