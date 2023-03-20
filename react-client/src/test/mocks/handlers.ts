import { rest } from 'msw'

const baseUrl = 'http://localhost'
export const handlers = [
  rest.get(baseUrl + '/api/auth/me', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: 'User' }))
  }),
]
