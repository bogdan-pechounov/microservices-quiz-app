import './App.css'
import Navbar from './components/navbar/Navbar'
import { useMeQuery } from './redux/services/authApi'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateQuiz from './pages/CreateQuizPage'
import QuizPage from './pages/QuizPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  useMeQuery()
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/quiz/:id' element={<QuizPage />}></Route>
        <Route path='/quiz/create' element={<CreateQuiz />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
