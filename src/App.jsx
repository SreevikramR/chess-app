import './App.css'
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import  BoardComponent from './components/BoardComponent'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/board" element={<BoardComponent/>}/>
      </Routes>
    </>
  )
}

export default App
