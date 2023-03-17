import './App.css'
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import TrialPage from './pages/TrialPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import PasswordResetPage from './pages/PasswordResetPage'

function App() {

	return (
		<Routes>
			<Route path="/" element={<HomePage/>}/>
			<Route path="/try_now" element={<TrialPage/>}/>
			<Route path="/register" element={<RegisterPage/>}/>
			<Route path="/login" element={<LoginPage/>}/>
			<Route path='/dashboard' element={<Dashboard/>}/>
			<Route path='/reset' element={<PasswordResetPage/>}/>
		</Routes>
	)
}

export default App
