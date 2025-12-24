/* eslint-disable no-unused-vars */
import { motion, useScroll, useTransform } from 'framer-motion';

import { Routes, Route } from 'react-router-dom';
import Hero from './components/common/Hero';
import Services from './components/common/Services';
import './App.css'
import Process from './components/common/Process';
import { useState } from 'react'; // මේ පේළිය අනිවාර්යයෙන්ම ඕනේ
import LeftSidebar from './components/common/LeftSidebar';


function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* 1. අලුත් Left Sidebar එක */}
      <LeftSidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* 2. Main Content Area (වම් පැත්තේ 300px ඉතුරු කරලා) */}
 <main className="lg:pl-[140px] px-8 py-8 transition-all duration-700 bg-light-bg dark:bg-[#050505]">
  <div className="rounded-[50px] border border-black/[0.03] dark:border-white/[0.03] overflow-hidden shadow-sm">
    <Hero />
    <Process />
    <Services />
    {/* ඊළඟට අපි මෙතනට Reviews එකතු කරමු */}
  </div>
</main>
    </div>
  );
}

export default App;