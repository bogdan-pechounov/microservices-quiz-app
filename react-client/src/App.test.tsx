import App from './App'
import { render, screen, userEvent } from './test/test-utils'

describe('App', () => {
  it('renders', () => {
    render(<App />)
    // expect(screen.getByText(/Hello Vite \+ React!/i)).toBeInTheDocument()
  })
})
