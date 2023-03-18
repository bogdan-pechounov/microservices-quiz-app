const request = require('supertest')
const app = require('../src/app.js')

describe('App', () => {
  test('responds with a default message', async () => {
    const response = await request(app).get('/api/auth')
    expect(response.statusCode).toBe(200)
    expect(response.text.length).toBeGreaterThan(0)
  })
})
