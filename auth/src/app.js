const express = require('express')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

// app.set('trust proxy', true) //for nginx TODO is it necessary

//Middleware
app.use(express.json()) //parse json

//Routes
app.get('/api/auth', (req, res) => {
  res.send('hi11')
})

app.use('/api/auth', require('./routes/authRouter'))

//Error handling
app.use(errorHandler)

module.exports = app
