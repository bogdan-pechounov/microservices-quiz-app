const jwt = require('jsonwebtoken')
const { checkEnv } = require('./utils')

//Settings
const JWT_SECRET = checkEnv('JWT_SECRET')
console.log(JWT_SECRET)

const TOKEN_NAME = 'jwt'
const cookie_options = {
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
}
const expiresIn = '7d'

/**
 * Create a JWT token for a user
 * @param {User} user
 * @returns jwt token
 */
function createToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn,
  })
}

/**
 * Set cookie to store jwt token using options
 * @param {Response} res
 * @param {Token} token
 */
function setCookie(res, token) {
  res.cookie(TOKEN_NAME, token, cookie_options)
}

/**
 * Clear cookie for logging out
 * @param {Response} res
 */
function clearCookie(res) {
  const { maxAge, ...options } = cookie_options
  res.clearCookie(TOKEN_NAME, options)
}

module.exports = { createToken, setCookie, clearCookie }
