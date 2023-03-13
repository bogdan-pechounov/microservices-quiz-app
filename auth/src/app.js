const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('hi10')
})

app.get('/api/users', (req, res) => {
  res.send('Users')
})

module.exports = app
