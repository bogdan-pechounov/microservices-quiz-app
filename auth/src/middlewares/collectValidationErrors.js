const { validationResult } = require('express-validator')

function collectValidationErrors(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    //TODO throw error
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

module.exports = collectValidationErrors
