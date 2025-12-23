/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wrench, Moon, Sun, ChevronRight, LayoutGrid } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme Toggle logic
  const toggleTheme = () => {
  const newMode = !isDarkMode;
  setIsDarkMode(newMode);
  
  if (newMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'How it Works', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Reviews', href: '#' },
  ];

  return (
    <div className="fixed w-full top-0 z-50 flex justify-center px-4 py-6 transition-all duration-500">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`flex items-center justify-between px-6 md:px-10 py-3 rounded-[35px] transition-all duration-500 ${
          isScrolled 
            ? 'w-full md:w-[90%] bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 shadow-2xl' 
            : 'w-full bg-transparent border border-transparent'
        }`}
      >
        {/* Logo - Modern Squircle Design */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="bg-primary p-2.5 rounded-[15px] rotate-3 group-hover:rotate-0 transition-all duration-300 shadow-lg shadow-primary/30">
            <Wrench size={22} className="text-dark-bg" strokeWidth={3} />
          </div>
          <span className={`text-2xl font-black tracking-tighter ${isScrolled ? 'text-white' : 'text-white md:text-dark-bg dark:md:text-white'}`}>
            FIX<span className="text-primary italic">IT</span>
          </span>
        </motion.div>

        {/* Desktop Links - Minimalist */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex gap-10 text-[13px] font-black uppercase tracking-[2px]">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className={`transition-all duration-300 hover:text-primary relative group ${isScrolled ? 'text-gray-200' : 'text-gray-500 dark:text-gray-300'}`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          <div className="h-5 w-[1px] bg-white/20 mx-2"></div>

          {/* Theme & Profile Actions */}
          <div className="flex items-center gap-6">
            <motion.button 
              whileTap={{ rotate: 180 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full border border-white/10 ${isScrolled ? 'text-white' : 'text-dark-bg dark:text-white'}`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-dark-bg px-8 py-3 rounded-full font-black text-xs shadow-xl shadow-primary/20 hover:bg-white transition-all"
            >
              LOGIN
            </motion.button>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button 
            className={`p-2 rounded-2xl bg-white/5 border border-white/10 ${isScrolled ? 'text-white' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <LayoutGrid size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu - Premium Fullscreen Blur */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 top-24 z-40 md:hidden bg-dark-bg/90 backdrop-blur-3xl rounded-[40px] border border-white/10 p-10 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col h-full justify-between">
              <div className="flex flex-col gap-8">
                {navLinks.map((link, index) => (
                  <motion.a 
                    key={link.name} 
                    href={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-white text-4xl font-black tracking-tighter hover:text-primary transition-colors flex justify-between items-center group"
                  >
                    {link.name}
                    <ChevronRight className="text-primary opacity-0 group-hover:opacity-100 transition-all" />
                  </motion.a>
                ))}
              </div>
              
              <button className="bg-primary text-dark-bg w-full py-6 rounded-[25px] font-black text-lg shadow-2xl">
                GET STARTED
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;