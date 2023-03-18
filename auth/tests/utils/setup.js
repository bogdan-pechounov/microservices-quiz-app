const db = require('./db')

//Connect to database before tests
beforeAll(async () => {
  await db.connect()
})

//Disconnect from database after tests
afterAll(async () => {
  await db.disconnect()
})

//Reset database before each test
beforeEach(async () => {
  await db.clear()
})
