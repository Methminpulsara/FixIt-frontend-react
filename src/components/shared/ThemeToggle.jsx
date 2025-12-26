import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext'; // Path එක නිවැරදිද බලන්න

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button 
            type="button"
            onClick={toggleTheme} 
            className="fixed top-8 right-8 z-[100] p-4 bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 rounded-full text-primary hover:scale-110 transition-all shadow-lg"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            {isDarkMode ? (
                <Sun size={24} className="text-yellow-400" />
            ) : (
                <Moon size={24} className="text-gray-600" />
            )}
        </button>
    );
};

export default ThemeToggle;