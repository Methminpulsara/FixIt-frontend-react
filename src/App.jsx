import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Hero from './components/common/Hero';
import Services from './components/common/Services';
import './App.css'


function App() {
  return (
<div className="min-h-screen bg-light-bg dark:bg-dark-bg selection:bg-primary selection:text-dark-bg transition-colors duration-500">      {/* Navbar එක Routes වලින් එළියේ තියෙන්න ඕනේ. එතකොටයි හැම පේජ් එකකම පේන්නේ */}
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Services />
            </>
          } />
          
          {/* උදාහරණයක් විදිහට පස්සේ කාලෙක ලොගින් පේජ් එකක් හැදුවොත් මෙහෙම දාන්න පුළුවන් */}
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </main>

      {/* Footer එකකුත් පස්සේ මෙතනට දාමු */}
    </div>
  );
}

export default App;