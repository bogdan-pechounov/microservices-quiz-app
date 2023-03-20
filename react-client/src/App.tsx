import './App.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Navbar from './components/navbar/Navbar'
import { useMeQuery } from './redux/services/authApi'
import Home from './pages/Home'

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Home />
    </Provider>
  )
}

export default App
