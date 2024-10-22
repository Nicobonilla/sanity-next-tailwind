import { GetServicesNavQueryResult } from '@/sanity.types';
import type { Links } from '@/types';

// Función para formatear los servicios en Links[]
export function formatServices(
  servicesList: GetServicesNavQueryResult
): Links[] {
  return servicesList.map((service) => ({
    id: service.slug || '', // Usa un string vacío si slug es null
    title: service.title || '', // Usa un string vacío si title es null
    slug: service.slug || undefined, // Usa undefined si slug es null
    unitBusiness: service.unitBusiness
      ? {
          title: service.unitBusiness.title || undefined, // Usa undefined si title es null
          icon: service.unitBusiness.icon || null, // Usa null si icon es null
          slug: service.unitBusiness.slug || undefined, // Usa undefined si slug es null
        }
      : null, // Si unitBusiness no existe, establece como null
  }));
}
