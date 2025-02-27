import { useEffect, useRef, useState } from "react";

const useExitIntent = (onExit: () => void, delay = 3) => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const hasFired = useRef(false); // Para asegurarnos de que solo se ejecuta una vez

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!hasInteracted || hasFired.current) return;

      const isExiting = !event.relatedTarget && event.clientY <= 0 && event.movementY < -10;

      if (isExiting) {
        hasFired.current = true; // Evita disparar el evento múltiples veces
        onExit();
        document.removeEventListener("mousemove", handleMouseMove);
      }
    };

    const handleUserInteraction = () => {
      setTimeout(() => setHasInteracted(true), delay * 1000);
      document.removeEventListener("mousemove", handleUserInteraction); // Corrige la eliminación de eventos
    };

    if (window.innerWidth > 768) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mousemove", handleUserInteraction, { once: true });
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousemove", handleUserInteraction);
    };
  }, [hasInteracted, onExit, delay]);
};

export default useExitIntent;
