'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/shared/Icon';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

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
    <button
      onClick={toggleTheme}
      className="bg-bodydark relative flex h-6 w-12 items-center rounded-full border border-gray-500 p-1"
    >
      {/* Iconos estáticos del sol y la luna */}
      <span className="absolute left-1">
        <Icon name="sun" color="#6b7280" size={14} />
      </span>
      <span className="absolute right-1">
        <Icon name="moon" fill="#6b7280" size={14} />
      </span>

      {/* Círculo deslizante que cambia según el tema */}
      <div
        className={`bg-bodydark size-4 transform rounded-full border border-gray-500 transition-transform duration-300 ease-in-out ${
          isDark ? 'translate-x-6' : ''
        }`}
      ></div>
    </button>
  );
};

export default ThemeToggle;
