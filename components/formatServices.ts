import type { Links } from '@/types';

// Función para formatear los servicios en Links[]
export function formatServices(servicesList: Array<{ slug: string | null, title: string | null }>): Links[] {
  return servicesList.map(service => ({
    id: service.slug || '', // Garantiza que id no sea null
    section: service.title || '', // Garantiza que el título no sea null
    href: { pathname: `/services/${service.slug || ''}` }, // Asegura que la ruta siempre sea válida
  }));
}