const request = require('supertest')
const app = require('../src/app.js')

describe('Logout', () => {
  // test('clears cookie', async () => {
  //   const agent = request.agent(app)

  //   const user = { username: 'User', password: 'password' }
  //   const response = await agent.post('/api/auth/signup').send(user).expect(201)
  //   console.log(response.headers['set-cookie'])
  //   console.log(agent.jar.getCookies(CookieAccessInfo()))

  //   await agent.post('/api/auth/login').send(user) //console.log(req.cookies)
  //   // console.log(agent.jar.getCookies(CookieAccessInfo()))

  //   // let jwtToken = agent.jar.getCookie('jwt', CookieAccessInfo())
  //   // expect(jwtToken).toBeDefined()
  // })

  test('clears cookie', async () => {
    const agent = request.agent(app)

    const user = { username: 'User', password: 'password' }
    await agent.post('/api/auth/signup').send(user).expect(201)

    const { body } = await agent.get('/api/auth/me').expect(200)
    expect(body.username).toBe(user.username)

    await agent.post('/api/auth/logout').expect(200)
    await agent.get('/api/auth/me').expect(401)
  })
})
