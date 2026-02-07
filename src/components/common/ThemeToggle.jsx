import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            type="button"
        >
            <div className={`theme-toggle-indicator ${isDark ? 'dark' : 'light'}`}>
                {isDark ? <Moon size={16} /> : <Sun size={16} />}
            </div>
        </button>
    );
};

export default ThemeToggle;
