import './App.css'
import Navbar from './components/navbar/Navbar'
import { useMeQuery } from './redux/services/authApi'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateQuiz from './pages/CreateQuiz'

function App() {
  useMeQuery()
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/quiz/create' element={<CreateQuiz />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
