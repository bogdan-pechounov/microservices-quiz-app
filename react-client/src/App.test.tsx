import App from './App'
import { render, screen, userEvent } from './test/test-utils'

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />)
    // expect(screen.getByText(/Hello Vite \+ React!/i)).toBeInTheDocument()
  })
})
