'use client';

import { useScrollContext } from '@/context/ScrollContext';
import { useEffect, useState } from 'react';
import { AiOutlineSun } from 'react-icons/ai';
import { IoMoonSharp } from 'react-icons/io5';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const { scrolling } = useScrollContext();
  // Cargar el tema del almacenamiento local o preferencia del sistema
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      setIsDark(currentTheme === 'dark');
      document.documentElement.classList.toggle(
        'dark',
        currentTheme === 'dark'
      );
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  // Cambiar el tema y actualizar el DOM
  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button onClick={toggleTheme}>
      <span>
        {isDark ? <AiOutlineSun size={20} /> : <IoMoonSharp size={20} />}
      </span>
    </button>
  );
};

export default ThemeToggle;
