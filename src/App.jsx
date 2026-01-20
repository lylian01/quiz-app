import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Quizz from './pages/Quizz'
import './App.css'
import Rank from './pages/Rank'
import Nav from './components/nav'

function App() {

  return (
    <BrowserRouter>
      <div className="bg-radial-[at_100%_90%] from-(--primary) to-(--primary-light) from-60% h-full min-h-screen">
        {/* Header */}
        <Nav />
        {/* Routes */}
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/quizz' element={<Quizz />}/>
          <Route path='/rank' element={<Rank />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
