import './App.css'
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import  BoardComponent from './components/BoardComponent'
import BoardPage from './pages/BoardPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/board" element={<BoardPage/>}/>
      </Routes>
    </>
  )
}

export default App
