import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Hero from './components/common/Hero';
import Services from './components/common/Services';
import './App.css'
import Process from './components/common/Process';
import RightSideNav from './components/common/RightSideNav';
import { useState } from 'react'; // මේ පේළිය අනිවාර්යයෙන්ම ඕනේ

function App() {
  // Theme state එක මෙතන තියාගන්න (Navbar එකටයි අනිත් ඒවාටයි දෙන්න ඕන නිසා)
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="bg-light-bg dark:bg-dark-bg min-h-screen transition-colors duration-500">
      
      {/* පරණ Navbar එක වෙනුවට මේක දාන්න */}
      <RightSideNav isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main>
        <Hero />
        <Process />
        <Services />
        {/* <Reviews /> */}
      </main>
      
    </div>
  );
}

export default App;