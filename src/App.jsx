/* eslint-disable no-unused-vars */
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import LeftSidebar from './components/common/LeftSidebar';
import Home from './pages/Home'; // 🏠 Home පේජ් එක
import Login from './pages/auth/Login'; // 🔑 Login පේජ් එක
import './App.css'
import SignUp from './pages/auth/SingUp';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
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

  const isAuthPage = location.pathname.startsWith('/login') || location.pathname.startsWith('/sign-up');
  return (
<div className={`min-h-screen transition-colors duration-700 ${isDarkMode ? 'dark bg-[#050505]' : 'bg-light-bg'}`}>
    
    {/* Auth Page එකක් නෙවෙයි නම් විතරක් Sidebar එක පෙන්වන්න */}
    {!isAuthPage && <LeftSidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}

    <main className={`${isAuthPage ? 'p-0 m-0 w-full min-h-screen' : 'lg:pl-35 px-8 py-8'} transition-all duration-700`}>
      <div className={isAuthPage ? "w-full min-h-screen" : "relative rounded-[50px] border border-black/5 dark:border-white/5 overflow-hidden shadow-sm bg-white dark:bg-[#050505]"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </main>
  </div>
  );
}

export default App;