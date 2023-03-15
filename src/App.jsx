import './App.css'
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import TrialPage from './pages/TrialPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/try_now" element={<TrialPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </>
  )
}

export default App
