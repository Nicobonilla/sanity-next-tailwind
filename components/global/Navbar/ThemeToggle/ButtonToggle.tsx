// components/global/ThemeToggle.tsx

'use client';

import { useTheme } from '@/context/ThemeContext';
import { AiOutlineSun } from 'react-icons/ai';
import { IoMoonSharp } from 'react-icons/io5';
const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-6 w-12 items-center rounded-full border border-gray-500 bg-bodydark p-1"
    >
      {/* Iconos estáticos del sol y la luna */}
      <span className="absolute left-1 text-gray-500">
        <AiOutlineSun size={25} />
      </span>
      <span className="absolute right-1 text-gray-500">
        <IoMoonSharp size={25} />
      </span>

      {/* Círculo deslizante que cambia según el tema */}
      <div
        className={`z-10 size-4 rounded-full border border-gray-500 bg-bodydark transition-transform duration-300 ease-in-out dark:bg-bodydark ${
          isDarkMode ? 'translate-x-6' : ''
        }`}
      ></div>
    </button>
  );
};

export default ThemeToggle;
