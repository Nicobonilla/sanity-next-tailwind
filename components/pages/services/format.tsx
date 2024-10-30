import { GetServicesNavQueryResult } from '@/sanity.types';
import type { Links } from '@/types';
import { GetPagesQueryResult } from '../../../sanity.types';

// Función para formatear los servicios en Links[]
export function formatService(
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

export function formatPages(pagesList: GetPagesQueryResult): Links[] {
  return pagesList.map((page) => ({
    id: page.slug || '', // Usa un string vacío si slug es null
    title: page.title || '', // Usa un string vacío si title es null
    slug: page.isHome ? '' : page.slug || undefined, // Usa undefined si slug es null
    position: page.position || undefined,
  }));
}
