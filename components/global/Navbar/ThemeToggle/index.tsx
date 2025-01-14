'use client';
import { useTheme } from '@/context/ThemeContext'; // Importa el contexto
import { AiOutlineSun } from 'react-icons/ai';
import { IoMoonSharp } from 'react-icons/io5';

const ThemeToggle = () => {
  // Usa el contexto para acceder al estado y la función
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {' '}
      {/* Llama a toggleTheme desde el contexto */}
      <span>
        {isDarkMode ? (
          <AiOutlineSun size={24} /> // Muestra el ícono del sol cuando el tema es oscuro
        ) : (
          <IoMoonSharp size={24} /> // Muestra el ícono de la luna cuando el tema es claro
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
