/* eslint-disable no-unused-vars */
import { Routes, Route, useLocation } from 'react-router-dom';
import LeftSidebar from './components/common/LeftSidebar';
import ProtectedRoute from './components/common/ProtectedRoute'; // Import ProtectedRoute
import Home from './pages/Home';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SingUp';
import Onboarding from './pages/Onboarding';
import './App.css';
import { AuthProvider } from './context/AuthContext';

// 1. ThemeContext එක import කරගන්න
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';

// Toaster එක සහ අනෙකුත් Components පාලනය කරන ප්‍රධාන කොටස
function AppContent() {
  const { isDarkMode, toggleTheme } = useTheme(); 
  const location = useLocation();

  const isAuthPage = location.pathname.startsWith('/login') || 
                    location.pathname.startsWith('/sign-up') || 
                    location.pathname.startsWith('/onboarding');

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDarkMode ? 'dark bg-[#050505]' : 'bg-light-bg'}`}>
      
      {/* 2. Toaster එකට Key එකක් දීමෙන් Theme එක මාරු වූ සැණින් Toast එකේ පාටද මාරු වේ */}
      <Toaster 
        key={isDarkMode ? 'dark-toast' : 'light-toast'}
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          duration: 4000,
          style: {
            background: isDarkMode ? '#1a1a1a' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
            border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600',
            padding: '12px 24px',
            boxShadow: isDarkMode ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.05)',
          },
          success: { iconTheme: { primary: '#FFB800', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ff4b4b', secondary: '#fff' } },
        }}
      />
      
      {!isAuthPage && <LeftSidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}

      <main className={`${isAuthPage ? 'p-0 m-0 w-full min-h-screen' : 'lg:pl-[120px] px-8 py-8'} transition-all duration-700`}>
        <div className={isAuthPage ? "w-full min-h-screen" : "relative rounded-[50px] border border-black/5 dark:border-white/5 overflow-hidden shadow-sm bg-white dark:bg-[#050505]"}>
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />

            {/* --- Protected Routes (Role Based) --- */}

            {/* Mechanic හට පමණක් යා හැකි Onboarding පිටුව */}
            <Route element={<ProtectedRoute allowedRoles={['mechanic']} />}>
                <Route path="/onboarding/mechanic" element={<Onboarding typeProp="mechanic" />} />
            </Route>

            {/* Garage හට පමණක් යා හැකි Onboarding පිටුව */}
            <Route element={<ProtectedRoute allowedRoles={['garage']} />}>
                <Route path="/onboarding/garage" element={<Onboarding typeProp="garage" />} />
            </Route>

            {/* ඕනෑම ලොග් වූ පරිශීලකයෙකුට යා හැකි පොදු Dashboard (අවශ්‍ය නම් පමණක්) */}
            <Route element={<ProtectedRoute allowedRoles={['mechanic', 'garage', 'customer']} />}>
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Route>

          </Routes>
        </div>
      </main>
    </div>
  );
}

// 3. මුළු App එකම ThemeProvider සහ AuthProvider එකෙන් wrap කරන්න
export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}