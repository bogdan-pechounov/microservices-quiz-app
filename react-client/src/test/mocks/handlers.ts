import { rest } from 'msw'

console.log('ORIGIN', window.location.origin) //TODO
export const handlers = [
  rest.get('/api/auth/me', (req, res, ctx) => {
    console.log('REQUEST')
    return res(ctx.status(200), ctx.json({ username: 'User' }))
  }),
]
