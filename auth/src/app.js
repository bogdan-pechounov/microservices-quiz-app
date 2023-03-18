const express = require('express')

const app = express()

// app.set('trust proxy', true) //for nginx TODO is it necessary

//Middleware
app.use(express.json()) //parse json

//Routes
app.get('/api/auth', (req, res) => {
  res.send('hi11')
})

app.use('/api/auth', require('./routes/authRouter'))

module.exports = app
