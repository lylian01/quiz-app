import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import { Trophy } from 'lucide-react'

function App() {

  return (
    <div className="bg-(--accent) h-full min-h-screen">
      {/* Header */}
      <nav className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex items-center gap-3">
          <div>
            <Trophy className="text-yellow-500" size={48} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#6F4E37]">Quizz</h1>
          <h5 className="text-xl decoration-gray-700 opacity-75">Challenge yourself and master new skills!</h5>
          </div>
          <div>
            
          </div>
        </div>
      </nav>
     {/* Routes */}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
