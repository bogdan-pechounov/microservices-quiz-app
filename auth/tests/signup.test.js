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

  test('validates username min length', async () => {
    const user = { username: 'Use', password: 'password' }
    await request(app).post('/api/auth/signup').send(user).expect(400)
  })

  test('validates username max length', async () => {
    const user = { username: 'aaaaaaaaaaaaaaaa', password: 'password' }
    await request(app).post('/api/auth/signup').send(user).expect(400)
  })

  test('validates password', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({ username: 'User', password: 'pass' })
      .expect(400)
    await request(app)
      .post('/api/auth/signup')
      .send({ username: 'User', password: 'asdadfjldkajdklkjfdka' })
      .expect(400)
  })

  test('no duplicate usernames', async () => {
    const user = { username: 'User', password: 'password' }
    const user2 = { username: 'User2', password: 'password' }
    await request(app).post('/api/auth/signup').send(user).expect(201)
    await request(app).post('/api/auth/signup').send(user2).expect(201)
    await request(app).post('/api/auth/signup').send(user).expect(409)
  })
})
