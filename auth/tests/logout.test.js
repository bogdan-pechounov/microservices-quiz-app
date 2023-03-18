const request = require('supertest')
const app = require('../src/app.js')
const { CookieAccessInfo } = require('cookiejar')

describe('Logout', () => {
  test('clears cookie', async () => {
    const agent = request.agent(app)

    const user = { username: 'User', password: 'password' }
    const response = await agent.post('/api/auth/signup').send(user).expect(201)
    console.log(response.headers['set-cookie'])
    console.log(agent.jar.getCookies(CookieAccessInfo()))

    await agent.post('/api/auth/login').send(user) //console.log(req.cookies)
    // console.log(agent.jar.getCookies(CookieAccessInfo()))

    // let jwtToken = agent.jar.getCookie('jwt', CookieAccessInfo())
    // expect(jwtToken).toBeDefined()
  })
})
