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
      className="relative flex h-8 w-16 items-center rounded-full border border-gray-500 bg-bodydark p-1 transition-all duration-300 ease-in-out"
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
        className={`z-10 h-6 w-6 rounded-full border border-gray-500 bg-bodydark transition-transform duration-300 ease-in-out ${
          isDarkMode ? 'translate-x-8' : ''
        }`}
      ></div>
    </button>
  );
};

export default ThemeToggle;
