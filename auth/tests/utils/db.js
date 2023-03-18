const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

/**
 * Connect to in memory mongo server
 */
async function connect() {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri())
}

/**
 * Disconnect from server
 */
async function disconnect() {
  // await mongoose.disconnect()
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongoServer.stop()
}

/**
 * Delete all collections in database
 */
async function clear() {
  const collections = Object.values(mongoose.connection.collections)
  for (const collection of collections) {
    await collection.deleteMany()
  }
}

const db = { connect, disconnect, clear }
module.exports = db
