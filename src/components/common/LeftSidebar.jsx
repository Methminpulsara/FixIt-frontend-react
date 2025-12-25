/* eslint-disable no-unused-vars */
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Sun, Moon, Wrench, LayoutGrid, Zap, MessageSquare, Home, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LeftSidebar = ({ isDarkMode, toggleTheme }) => {

  const navigate = useNavigate();

  const [hovered, setHovered] = useState(null);

  const navLinks = [
    { name: 'Home', to: 'hero', icon: Home },
    { name: 'Process', to: 'process', icon: Zap },
    { name: 'Services', to: 'services', icon: LayoutGrid },
    { name: 'Reviews', to: 'reviews', icon: MessageSquare },
  ];

  return (
    <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:block">
      {/* 🔮 The Organic Floating Body */}
      <motion.div 
        className="relative bg-white/40 dark:bg-white/5 backdrop-blur-[40px] border border-white/20 p-4 rounded-full flex flex-col items-center gap-10 shadow-[0_40px_100px_rgba(0,0,0,0.1)] group/nav"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        
        {/* Logo with Outer Glow */}
        <div className="relative pt-4">
          <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full scale-150 animate-pulse" />
          <div className="relative bg-dark-bg p-4 rounded-[22px] shadow-2xl">
            <Wrench size={22} className="text-primary" />
          </div>
        </div>

        {/* Navigation - Minimalist but Interactive */}
        <nav className="flex flex-col gap-6 relative px-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              spy={true}
              onMouseEnter={() => setHovered(link.name)}
              onMouseLeave={() => setHovered(null)}
              activeClass="nav-active"
              className="relative group/item cursor-pointer p-4 rounded-full transition-all duration-500 hover:bg-white/10 dark:hover:bg-white/5"
            >
              {/* Tooltip that pops out uniquely */}
              <AnimatePresence>
                {hovered === link.name && (
                  <motion.div
                    initial={{ opacity: 0, x: -20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 20, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.8 }}
                    className="absolute left-16 bg-primary text-dark-bg px-5 py-2 rounded-[18px] text-[10px] font-black uppercase tracking-[2px] shadow-2xl shadow-primary/40 whitespace-nowrap z-50 pointer-events-none"
                  >
                    {link.name}
                  </motion.div>
                )}
              </AnimatePresence>

              <link.icon className="text-gray-400 group-[.nav-active]:text-primary group-hover/item:scale-125 transition-all duration-500" size={20} />
              
              {/* Active Dot indicator */}
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-0 bg-primary rounded-full group-[.nav-active]:h-4 transition-all duration-700" />
            </Link>
          ))}
        </nav>

        {/* 🚀 The "Out-of-the-box" Login Button */}
        <div className="flex flex-col items-center gap-6 pb-4">
          <motion.button 
            onClick={()=>navigate('/login')}
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="group/login relative p-5 bg-primary text-dark-bg rounded-[25px] shadow-[0_20px_40px_rgba(254,176,93,0.3)] hover:shadow-primary/60 transition-all overflow-hidden"
          >
             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/login:translate-y-0 transition-transform duration-500" />
             <LogIn size={20} className="relative z-10" />
          </motion.button>

          {/* Minimal Theme Switch */}
          <button 
            onClick={toggleTheme}
            className="p-4 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-gray-400 hover:text-primary transition-colors"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </motion.div>
    </aside>
  );
};

export default LeftSidebar;