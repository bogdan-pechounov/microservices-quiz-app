const request = require('supertest')
const app = require('../src/app.js')
const User = require('../src/models/user.js')

describe('SignUp', () => {
  test('creates user', async () => {
    const user = { username: 'User', password: 'password' }
    const {
      body: { id },
    } = await request(app).post('/api/auth/signup').send(user).expect(201)
    const createdUser = await User.findById(id)
    expect(user.username).toBe(createdUser.username)
  })

  test('hashes password', async () => {
    const user = { username: 'User', password: 'password' }
    const {
      body: { id },
    } = await request(app).post('/api/auth/signup').send(user).expect(201)
    const createdUser = await User.findById(id)
    expect(user.password).not.toBe(createdUser.password)
  })

  test('sets cookie header', async () => {
    const user = { username: 'User', password: 'password' }
    const response = await request(app)
      .post('/api/auth/signup')
      .send(user)
      .expect(201)
    expect(response.headers['set-cookie']).toBeDefined()
  })
})
