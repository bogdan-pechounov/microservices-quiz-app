const bcrypt = require('bcrypt')

/**
 * Hash password with salt
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
    return await bcrypt.compare(password, hashedPassword)
  } catch {
    return false
  }
}

module.exports = { hashPassword, verifyPassword }
