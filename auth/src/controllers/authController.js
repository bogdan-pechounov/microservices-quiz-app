const User = require('../models/user')
const { hashPassword } = require('../utils/password')
const { createToken, setCookie } = require('../utils/tokens')

//Sign up
async function signUp(req, res) {
  //extract fields
  const { username, password } = req.body
  //hash password before saving
  const hashedPassword = await hashPassword(password)
  //save user
  const user = await User.create({ username, password: hashedPassword })
  //set cookie
  const jwtToken = createToken(user)
  setCookie(res, jwtToken)
  res.status(201).send(user)
}

//Login
async function login(req, res) {}

const authController = { signUp, login }

module.exports = authController