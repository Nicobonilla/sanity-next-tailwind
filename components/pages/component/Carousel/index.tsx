// components/ServicesCarousel.tsx

'use client';

import { useState, useEffect } from 'react';
import Slide from './Slide'; // Importamos el componente Slide
import NavButton from './NavButton'; // Importamos el componente NavButton
import { ComponentProps } from '../../PageTemplate';

export default function ServicesCarousel({ data }: { data: ComponentProps }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const slides = Array.isArray(data.items) ? data.items : [];
  const totalSlides = slides?.length;

  // Función para cambiar a la siguiente slide
  const nextSlide = () => {
    if (transitioning) return;
    setTransitioning(true);

    setCurrentSlide((prev) => {
      const next = totalSlides ? (prev + 1) % totalSlides : 1;
      return next;
    });
  };

  // Función para cambiar a la slide anterior
  const prevSlide = () => {
    if (transitioning) return;
    setTransitioning(true);

    setCurrentSlide((prev) => {
      const prevIndex = totalSlides
        ? (prev - 1 + totalSlides) % totalSlides
        : 1;
      return prevIndex;
    });
  };

  // Resetear la transición después de que la animación se haya completado
  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitioning(false);
    }, 500); // Duración de la transición de 500ms

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="relative mt-20 w-full overflow-hidden bg-gray-900">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * (100 / Math.min(slides ? slides.length : 1, 4))}%)`,
        }}
      >
        {/* Clonamos los slides para crear el looping */}
        {[...slides, ...slides, ...slides].map((slide, index) => (
          <Slide key={index} slide={slide} />
        ))}
      </div>

      {/* Botones de navegación */}
      <NavButton direction="prev" onClick={prevSlide} />
      <NavButton direction="next" onClick={nextSlide} />
    </div>
  );
}
