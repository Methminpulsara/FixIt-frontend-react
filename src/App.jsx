
import './App.css'
import Hero from './components/common/Hero'
import Navbar from './components/common/Navbar'

function App() {

  return (
   <div className="min-h-screen bg-light selection:bg-primary selection:text-dark">
      <Navbar />
      <Hero />
      {/* ඊළඟට අපි මෙතනට Services Section එක දාමු */}
    </div>
  )
}

export default App
