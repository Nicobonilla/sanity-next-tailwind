import { defineQuery, groq } from 'next-sanity';
import { unitBusiness } from './unitBusiness.query';
import { componentFields } from './component.query';
import { seoFields } from './seo.query';

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
  groq`*[_type == 'service' && isActive == true && slug.current == $slug][0] {
    title,  // Fetch the title of the service
    "slug": slug.current,
    iconfyIcon,
    resumen,
    ${seoFields},
    content,  // Fetch the content of the service
    "tableOfContents" : content[style in ['h2']] {
      _key,
      style,
      'text':children[0].text 
    },
    ${unitBusiness},
    components[isActive == true] | order(orderRank asc) { ${componentFields} }
  }`
);
