const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('hi10')
})

app.get('/api/users', (req, res) => {
  res.send('Users')
})

app.listen(3000, () => {
  console.log('Listening on port 3000...')
})

console.log('test')
