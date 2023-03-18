const User = require('../models/user')
const { hashPassword, verifyPassword } = require('../utils/password')
const { createToken, setCookie, clearCookie } = require('../utils/tokens')

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
async function login(req, res) {
  console.log(req.cookies)
  const { username, password } = req.body
  const user = await User.findOne({ username })
  //Verify if user is found and if passwords match
  if (!user || !(await verifyPassword(password, user.password))) {
    return res.status(401).send('Invalid credentials')
  }
  //set cookie
  const jwtToken = createToken(user)
  setCookie(res, jwtToken)

  res.send(user)
}

//Logout
async function logout(req, res) {
  clearCookie(res)
  res.send('Logged out')
}

module.exports = { signUp, login, logout }
