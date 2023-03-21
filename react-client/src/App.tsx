import './App.css'
import Navbar from './components/navbar/Navbar'
import { useMeQuery } from './redux/services/authApi'
import Home from './pages/Home'

function App() {
  useMeQuery()
  return (
    <>
      <Navbar />
      <Home />
    </>
  )
}

export default App
