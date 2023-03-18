const express = require('express')
const { body } = require('express-validator')

const authController = require('../controllers/authController')
const collectValidationErrors = require('../middlewares/collectValidationErrors')

const router = express.Router()

//Settings
const settings = {
  username: {
    min: 4,
    max: 15,
  },
  password: {
    min: 5,
    max: 20,
  },
}

//Sign up
router.post(
  '/signup',
  [
    body('username')
      .isLength({ min: settings.username.min, max: settings.username.max })
      .withMessage(
        `Username must be between ${settings.username.min} and ${settings.username.max} characters`
      ),
    body('password')
      .isLength({ min: settings.password.min, max: settings.password.max })
      .withMessage(
        `Password must be between ${settings.password.min} and ${settings.password.max} characters`
      ),
  ],
  collectValidationErrors,
  authController.signUp
)

//Login
router.post(
  '/login',
  [
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  collectValidationErrors,
  authController.login
)

module.exports = router
