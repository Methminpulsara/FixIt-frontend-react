/* eslint-disable no-unused-vars */
import { motion, useScroll, useTransform } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import Hero from './components/common/Hero';
import Services from './components/common/Services';
import './App.css'
import Process from './components/common/Process';
import { useState, useEffect } from 'react'; 
import LeftSidebar from './components/common/LeftSidebar';
import Reviews from './components/common/Reviews';
import Footer from './components/common/Footer';
import DynamicPath from './components/common/DynamicPath'; // 👈 මේක අමතක කරන්න එපා

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDarkMode ? 'dark bg-[#050505]' : 'bg-light-bg'}`}>
      <LeftSidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="lg:pl-[140px] px-8 py-8 transition-all duration-700">
        <div className="relative rounded-[50px] border border-black/5 dark:border-white/5 overflow-hidden shadow-sm bg-white dark:bg-[#050505]">
          
          {/* 1. මේක තමයි පාර (Path) - හැමවිටම background එකේ තියෙන්නේ */}
          <DynamicPath /> 

          {/* 2. Content එක තියෙන කොටස - z-10 දාලා පාරට උඩින් තියෙනවා */}
          <div className="relative z-10 bg-transparent">
            <Hero />
            <Process />
            <Services />
            <Reviews />
            <Footer />
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;