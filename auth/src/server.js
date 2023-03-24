const mongoose = require('mongoose')
const app = require('./app')

//Listen
app.listen(3000, () => {
  console.log('Listening on port 3000...')
})

//Connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to:', process.env.MONGO_URI)
  })
  .catch((e) => {
    console.log("Couldn't connect to:", process.env.MONGO_URI)
    console.error(e)
  })

//Connect to message broker
require('./kakfka/connect')
