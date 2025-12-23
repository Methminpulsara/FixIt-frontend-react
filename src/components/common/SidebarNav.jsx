/* eslint-disable no-unused-vars */
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const SidebarNav = () => {
  const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'Process', to: 'process' },
    { name: 'Services', to: 'services' },
    { name: 'Reviews', to: 'reviews' },
  ];

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6 items-center">
      {/* පාරේ ඉර වගේ සිහින් ඉරක් Navbar එක පිටුපස */}
      <div className="absolute w-[2px] h-full bg-black/5 dark:bg-white/10 -z-10" />
      
      {navLinks.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          smooth={true}
          spy={true} // මේකෙන් තමයි ඉන්න තැන අඳුරගන්නේ
          activeClass="active-dot"
          className="group relative flex items-center justify-center cursor-pointer"
        >
          {/* Dot එක */}
          <motion.div 
            className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600 transition-all duration-300 group-hover:bg-primary group-[.active-dot]:bg-primary group-[.active-dot]:scale-150 group-[.active-dot]:shadow-[0_0_15px_#FEB05D]"
          />
          
          {/* නම (Hover කරාම විතරක් පේන) */}
          <span className="absolute right-8 px-3 py-1 rounded-lg bg-primary text-dark-bg text-xs font-black opacity-0 group-hover:opacity-100 transition-all pointer-events-none translate-x-4 group-hover:translate-x-0">
            {link.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default SidebarNav;