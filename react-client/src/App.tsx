import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  axios.get('/api/auth').then(console.log)
  return <div>App5</div>
}

export default App
