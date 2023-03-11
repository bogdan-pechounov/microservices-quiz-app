const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('hi8')
})

app.listen(3000, () => {
  console.log('Listening on port 3000...')
})

console.log('test')
