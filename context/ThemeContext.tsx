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

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Cargar el tema desde localStorage al inicio
  useEffect(() => {
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
  }, [isDarkMode]);

  // Cambiar el tema y actualizar el DOM
  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', newTheme === 'dark'); // Actualización inmediata
    localStorage.setItem('theme', newTheme); // Persistir tema
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
