const request = require('supertest')
const app = require('../src/app.js')

describe('SignUp', () => {
  test('Creates user', async () => {
    const user = { username: 'User', password: 'password' }
    const response = await request(app)
      .post('/api/auth/signup')
      .send(user)
      .expect(201)
    console.log(response.body)
  })
})
