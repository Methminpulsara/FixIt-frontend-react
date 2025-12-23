/* eslint-disable no-unused-vars */
import { Link } from 'react-scroll';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sun, Moon, Wrench } from 'lucide-react';

const RightSideNav = ({ isDarkMode, toggleTheme }) => {
  const { scrollYProgress } = useScroll();
  
  // දකුණු පැත්තේ ඉර පල්ලෙහාට ඇඳෙන animation එක
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'Process', to: 'process' },
    { name: 'Services', to: 'services' },
    { name: 'Reviews', to: 'reviews' },
  ];

  return (
    <div className="fixed right-6 md:right-10 top-0 h-screen z-[100] flex flex-col items-center justify-center gap-8">
      
      {/* Background Vertical Line */}
      <div className="absolute w-[1px] h-[300px] bg-black/10 dark:bg-white/10">
        <motion.div 
          style={{ height: lineHeight }}
          className="w-full bg-primary shadow-[0_0_10px_#FEB05D]"
        />
      </div>

      {/* Nav Links (Dots) */}
      <div className="flex flex-col gap-10 relative">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            smooth={true}
            spy={true}
            offset={-50}
            activeClass="nav-active"
            className="group relative flex items-center justify-center cursor-pointer"
          >
            {/* Dot Animation */}
            <div className="w-2.5 h-2.5 rounded-full bg-gray-400 dark:bg-gray-600 group-[.nav-active]:bg-primary group-[.nav-active]:scale-[1.8] transition-all duration-300 group-hover:bg-primary group-[.nav-active]:shadow-[0_0_15px_#FEB05D]" />
            
            {/* Tooltip (නම පේන එක) */}
            <span className="absolute right-8 opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-300 text-[10px] font-black uppercase tracking-widest bg-dark-bg text-white dark:bg-white dark:text-dark-bg px-3 py-1.5 rounded-full whitespace-nowrap shadow-xl">
              {link.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Theme Toggle at the bottom of Nav */}
      <motion.button 
        whileTap={{ scale: 0.8 }}
        onClick={toggleTheme}
        className="mt-8 p-3 rounded-full bg-white/10 backdrop-blur-md border border-black/5 dark:border-white/10 text-dark-bg dark:text-white shadow-lg"
      >
        {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
      </motion.button>
    </div>
  );
};

export default RightSideNav;