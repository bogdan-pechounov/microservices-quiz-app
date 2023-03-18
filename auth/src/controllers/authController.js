const User = require('../models/user')

async function signUp(req, res) {
  const { username, password } = req.body
  const user = await User.create({ username, password })
  console.log('USER', user)
  res.status(201).send(user)
}

const authController = { signUp }

module.exports = authController
