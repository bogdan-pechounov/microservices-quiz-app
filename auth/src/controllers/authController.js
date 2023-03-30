const { userCreated } = require('../kakfka/userProducer')
const User = require('../models/user')
const { hashPassword, verifyPassword } = require('../utils/password')
const {
  createToken,
  setCookie,
  clearCookie,
  getCookie,
  decodeToken,
} = require('../utils/tokens')

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
  //notify kafka
  userCreated(user)

  res.status(201).send(user)
}

//Login
async function login(req, res) {
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

//Me
async function me(req, res) {
  const jwt = getCookie(req)
  //Verify if user has jwt token in cookie
  if (!jwt) {
    return res.status(401).send('Not logged in')
  }
  //Get id in token
  const { id } = decodeToken(jwt)
  //Find user
  const user = await User.findById(id)
  if (!user) {
    return res.status(404).send('User not found')
  }

  res.send(user)
}

//Logout
async function logout(req, res) {
  clearCookie(res)
  res.send('Logged out')
}

module.exports = { signUp, login, logout, me }
