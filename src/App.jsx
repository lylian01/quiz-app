import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Quizz from './pages/Quizz'
import './App.css'
import { ScrollText, Trophy } from 'lucide-react'
import Rank from './pages/Rank'

function App() {

  return (
    <div className="bg-radial-[at_100%_90%] from-(--primary) to-(--primary-light) from-60% h-full min-h-screen">
      {/* Header */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className='flex items-center gap-3'>
            <Trophy className="text-yellow-500" size={48} />
            <div>
              <h1 className="text-3xl font-bold text-[#6F4E37]">Quizz</h1>
              <h5 className="text-xl decoration-gray-700 opacity-75">Challenge yourself and master new skills!</h5>
            </div>
          </div>
          <div>
              <ScrollText className="text-yellow-500" size={48} />
          </div>
        </div>
      </nav>
     {/* Routes */}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/quizz' element={<Quizz />}/>
        <Route path='/rank' element={<Rank />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
