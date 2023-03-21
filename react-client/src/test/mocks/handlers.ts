import { rest } from 'msw'

const baseUrl = 'http://localhost'

console.log(document.baseURI)
console.log('ORIGIN', window.location.origin)
export const handlers = [
  rest.get('/api/auth/me', (req, res, ctx) => {
    console.log('REQUEST')
    return res(ctx.status(200), ctx.json({ username: 'User' }))
  }),
]
