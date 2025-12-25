  /* eslint-disable no-unused-vars */
  import { Routes, Route, useLocation } from 'react-router-dom';
  import { useState, useEffect } from 'react'; 
  import LeftSidebar from './components/common/LeftSidebar';
  import Home from './pages/Home';
  import Login from './pages/auth/Login';
  import SignUp from './pages/auth/SingUp';
  import Onboarding from './pages/Onboarding';
  import './App.css'


  import { Toaster } from 'react-hot-toast';

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

    const isAuthPage = location.pathname.startsWith('/login') || 
                      location.pathname.startsWith('/sign-up') || 
                      location.pathname.startsWith('/onboarding');

    return (
      <div className={`min-h-screen transition-colors duration-700 ${isDarkMode ? 'dark bg-[#050505]' : 'bg-light-bg'}`}>
        <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          // Global styles
          duration: 4000,
          style: {
            background: isDarkMode ? '#151515' : '#fff',
            color: isDarkMode ? '#fff' : '#000',
            borderRadius: '20px', // ඔයාගේ card වලට ගැලපෙන rounded corners
            border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
            fontSize: '14px',
            fontWeight: '600',
            padding: '12px 24px',
            backdropFilter: 'blur(10px)',
          },
          // Success Alert එකට primary color එක (orange/yellow) icon එකට සෙට් කරමු
          success: {
            iconTheme: {
              primary: '#FFB800', // ඔයාගේ theme එකේ primary color එක
              secondary: '#fff',
            },
          },
          // Error Alert එක
          error: {
            iconTheme: {
              primary: '#ff4b4b',
              secondary: '#fff',
            },
          },
        }}
      />
        
        {/* 1. Sidebar එක මෙතන තියෙන්න ඕනේ (Main එකෙන් එළියේ) */}
        {!isAuthPage && <LeftSidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}

        {/* 2. මෙන්න ඔයාගේ මුල් CSS ටික ඒ විදියටම තියෙන Main එක */}
        <main className={`${isAuthPage ? 'p-0 m-0 w-full min-h-screen' : 'lg:pl-[120px] px-8 py-8'} transition-all duration-700`}>
          
          {/* 3. මෙන්න ඔයාගේ ලස්සන Rounded Container එක */}
          <div className={isAuthPage ? "w-full min-h-screen" : "relative rounded-[50px] border border-black/5 dark:border-white/5 overflow-hidden shadow-sm bg-white dark:bg-[#050505]"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/onboarding/:type" element={<Onboarding />} />
            </Routes>
          </div>
        </main>
      </div>
    );
  }

  export default App;