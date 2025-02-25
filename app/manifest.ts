import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  if (process.env.NODE_ENV === 'development') {
    return {};
  }
  return {
    name: 'Bufete de Abogados San Felipe',
    short_name: 'Abogados San Felipe',
    description:
      'Expertos en asesoría legal y servicios jurídicos en San Felipe.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0070f3',
    icons: [
      {
        src: '/icon.png', // Ícono generado dinámicamente
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  };
}
