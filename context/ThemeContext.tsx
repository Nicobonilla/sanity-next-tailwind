'use client';
import { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
export const ThemeProvider = ({
  withDarkMode,
  children,
}: {
  withDarkMode: boolean;
  children: React.ReactNode;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Only handle theme if withDarkMode is true
    console.log('withDarkMode', withDarkMode);
    if (withDarkMode) {
      const currentTheme = localStorage.getItem('theme');
      if (currentTheme) {
        setIsDarkMode(currentTheme === 'dark');
        document.documentElement.classList.toggle(
          'dark',
          currentTheme === 'dark'
        );
      } else {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        setIsDarkMode(prefersDark);
        document.documentElement.classList.toggle('dark', prefersDark);
      }
    } else {
      // If withDarkMode is false, force light theme
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [withDarkMode]);

  const toggleTheme = () => {
    // Only allow theme toggle if withDarkMode is true
    if (withDarkMode) {
      const newTheme = isDarkMode ? 'light' : 'dark';
      setIsDarkMode(!isDarkMode);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      localStorage.setItem('theme', newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
