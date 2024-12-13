'use client';

import { useState, useEffect } from 'react';
import Slide from './Slide';
import NavButton from './NavButton';
import { ComponentProps } from '../../PageTemplate';

export default function Carousel({ data }: { data: ComponentProps }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const slides = Array.isArray(data.items) ? data.items : [];
  const totalSlides = slides.length;
  const visibleSlides = 4; // Siempre mostramos 4 slides visibles.

  useEffect(() => {
    if (hoveredItemIndex !== null) return; // Pausa el loop si hay un slide activo por hover

    const timer = setInterval(() => {
      setActiveItemIndex((prevIndex) => (prevIndex + 1) % visibleSlides);
    }, 4000);

    return () => clearInterval(timer);
  }, [hoveredItemIndex]);

  const nextSlide = () => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitioning(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const handleMouseEnter = (index: number) => {
    setHoveredItemIndex(index % visibleSlides);
  };

  const handleMouseLeave = () => {
    setHoveredItemIndex(null);
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-900">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * (100 / Math.min(totalSlides, 4))}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            isActive={
              hoveredItemIndex !== null
                ? index % visibleSlides === hoveredItemIndex
                : index % visibleSlides === activeItemIndex
            }
          />
        ))}
      </div>

      <NavButton direction="prev" onClick={prevSlide} />
      <NavButton direction="next" onClick={nextSlide} />
    </div>
  );
}
