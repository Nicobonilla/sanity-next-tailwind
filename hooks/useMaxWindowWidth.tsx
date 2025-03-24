"use client";

import { useState, useEffect } from "react";

// Estado global para el ancho máximo detectado
let maxWidth = typeof window !== "undefined" ? window.innerWidth : 0;
const subscribers = new Set<(width: number) => void>();

/**
 * Hook optimizado que almacena el mayor ancho de pantalla detectado.
 *
 * @returns {number} Mayor ancho de la ventana registrado.
 */
export function useMaxWindowWidth(): number {
  const [width, setWidth] = useState(maxWidth);

  useEffect(() => {
    // Función para manejar cambios de tamaño
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth > maxWidth) {
        maxWidth = currentWidth;
        subscribers.forEach((callback) => callback(maxWidth));
      }
    };

    // Suscribir el componente a cambios en el ancho máximo
    subscribers.add(setWidth);

    // Agregar el listener solo una vez
    if (subscribers.size === 1) {
      window.addEventListener("resize", handleResize);
    }

    // Desuscribirse cuando el componente se desmonta
    return () => {
      subscribers.delete(setWidth);
      if (subscribers.size === 0) {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return width;
}

