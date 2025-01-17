import { Links } from '@/types';

export const groupServicesByBusiness = (
  pagesLink: Links[]
): Record<string, Links[]> => {
  const grouped: Record<string, Links[]> = {};

  pagesLink.forEach((service) => {
    // Agrega subsecciones al grupo correspondiente
    service?.subsections?.forEach((subsection) => {
      const title = subsection?.unitBusiness?.title;
      if (title) {
        grouped[title] = grouped[title] || [];
        grouped[title].push(subsection);
      }
    });

    // Agrega el servicio si no tiene subsecciones
    const title = service?.unitBusiness?.title;
    if (title) {
      grouped[title] = grouped[title] || [];
      grouped[title].push(service);
    }
  });

  return grouped;
};
