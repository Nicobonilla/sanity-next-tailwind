import {
  GetPagesNavQueryResult,
  GetServicesNavQueryResult,
} from '@/sanity.types';
import type { Links } from '@/types';

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

export function formatPages(
  pagesList: GetPagesNavQueryResult,
  servicesList: GetServicesNavQueryResult
): Links[] {
  // Map through the pages list to transform it to the desired structure
  const pages = pagesList.map((page) => ({
    id: page.slug || '', // Fallback to an empty string if `slug` is null or undefined
    title: page.title || '', // Fallback to an empty string if `title` is null or undefined
    slug: page.isHome ? '' : page.slug || undefined, // Set `slug` to undefined if `isHome` is true, else fallback to `undefined`
    position: page.position || undefined, // Fallback to `undefined` if `position` is null or undefined
  }));

  // Now, we need to process any page that has the title "servicios"
  const pagesLink = pages.map((page) => {
    if (page.title.toLowerCase() === 'servicios') {
      // If it's the "servicios" page, format its subsections
      return {
        ...page,
        subsections: formatService(servicesList), // Assuming `formatService` takes `servicesList`
      };
    }
    return page;
  });

  // Custom type guard to check if a page is valid Links (i.e., not null and has position)
  function isValidLink(page: any): page is Links {
    return page != null && page.position != null; // Ensures `page` is not null and has a valid `position`
  }

  // Filter out pages that are invalid and sort them by position
  return pagesLink
    .filter(isValidLink) // Use the custom type guard to filter out invalid `Links`
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0)); // Sort by position, default to 0 if `position` is `undefined`
}
