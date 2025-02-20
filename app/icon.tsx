import { ImageResponse } from 'next/og';

// Configuración del segmento de ruta
export const runtime = 'edge';

// Metadatos de la imagen
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Generación de la imagen
export default function Icon() {
  return new ImageResponse(
    (
      // Elemento JSX para la imagen
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        SB
      </div>
    ),
    // Opciones de ImageResponse
    {
      ...size, // Reutiliza el tamaño definido en los metadatos
    }
  );
}
