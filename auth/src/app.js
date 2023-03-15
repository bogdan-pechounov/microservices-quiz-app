const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('hi11')
})

app.get('/users', (req, res) => {
  res.send('Users')
})

module.exports = app
