require('express-async-errors') //help catch errors in promises

function errorHandler(err, req, res, next) {
  console.log('ERROR')
  //unique fields
  if (err.name === 'MongoServerError' && err.code === 11000) {
    let field = Object.keys(err.keyValue)[0]
    const msg = { [field]: `${field} already taken.` }
    res.status(409).send(msg)
  }
  //something unforeseen went wrong
  else {
    res.status(500).send(err)
  }
}

module.exports = errorHandler
