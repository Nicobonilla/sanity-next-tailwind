import { defineQuery, groq } from 'next-sanity';
import { unitBusiness } from './unitBusiness.query';
import { componentFields } from './component.query';

/* SERVICES - NAVIGATION */
export const getServicesNavQuery = defineQuery(
  groq`*[_type == 'service' && isActive] | order(unitBusiness->orderRank asc, orderRank asc) {
      "id": coalesce(slug.current, null),
      "title": coalesce(title, null),
      "slug": coalesce(slug.current, null),
      ${unitBusiness}
    }`
);
/* SERVICES - DETALLE */
export const getServiceDetailQuery = defineQuery(
  groq`*[_type == 'service' && slug.current == $slug][0] {
    title,  // Fetch the title of the service
    iconfyIcon,
    resumen,
    content,  // Fetch the content of the service
    ${unitBusiness},
    components[isActive] { ${componentFields} }
  }`
);
