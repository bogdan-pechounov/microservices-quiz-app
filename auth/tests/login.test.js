const request = require('supertest')
const app = require('../src/app.js')

describe('Login', () => {
  test('requires password', async () => {
    const user = { username: 'User' }
    await request(app).post('/api/auth/login').send(user).expect(400)
  })

  test('verifies password', async () => {
    const user = { username: 'User', password: 'password' }
    await request(app).post('/api/auth/signup').send(user).expect(201)

    await request(app).post('/api/auth/login').send(user).expect(200)
    await request(app)
      .post('/api/auth/login')
      .send({ ...user, password: 'incorrect' })
      .expect(401)
  })

  test('sets cookie header', async () => {
    const user = { username: 'User', password: 'password' }
    await request(app).post('/api/auth/signup').send(user).expect(201)

    const response = await request(app)
      .post('/api/auth/login')
      .send(user)
      .expect(200)

    expect(response.headers['set-cookie']).toBeDefined()
  })
})
