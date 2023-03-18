const express = require('express')

const app = express()

//Middleware
app.use(express.json()) //parse json
// app.set('trust proxy', true) //for nginx

app.get('/api/auth', (req, res) => {
  console.log('received')
  res.send('hi11')
})

app.get('/users', (req, res) => {
  res.send('Users')
})

module.exports = app
