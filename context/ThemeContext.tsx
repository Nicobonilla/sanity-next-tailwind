'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useLayoutEffect,
} from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Initialize with a default value
  const [isThemeLoaded, setIsThemeLoaded] = useState<boolean>(false);

  // Detect theme preference or retrieve from localStorage
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
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
      setIsThemeLoaded(true);
    }
  }, []);

  // Toggle the theme and store preference in localStorage
  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(newTheme === 'dark');
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  // Render a loading state while the theme is being determined
  if (!isThemeLoaded) {
    return <div>Loading theme...</div>; // Or any other loading indicator
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
