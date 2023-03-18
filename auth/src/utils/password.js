const bcrypt = require('bcrypt')

/**
 * Hashes a password
 * @param {string} password
 * @returns hashed password
 */
async function hashPassword(password) {
  return await bcrypt.hash(password, 12)
}

/**
 * Verify password against hashed password
 * @param {string} password
 * @param {string} hashedPassword
 * @returns whether passwords match
 */
async function verifyPassword(password, hashedPassword) {
  try {
    return await bcrypt.compare(password, hashPassword)
  } catch {
    return false
  }
}

module.exports = { hashPassword, verifyPassword }
