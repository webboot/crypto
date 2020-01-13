export const error = ({ msg, code }) => {
  const err = new Error(msg)
  err.code = code || 'EUNKNOWN'
  return err
}
