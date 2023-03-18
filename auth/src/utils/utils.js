/**
 * Check if env key is set in production
 * @param {string} key
 * @returns value of env variable
 */
function checkEnv(key) {
  const value = process.env[key]
  if (process.env.NODE_ENV == 'production' && !value) {
    throw new Error(`${key} must be defined`)
  }
  return value
}

module.exports = { checkEnv }
