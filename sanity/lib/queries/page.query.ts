import { defineQuery, groq } from 'next-sanity';
import { componentFields } from './component.query';
import { seoFields } from './seo.query';

/* PAGES - NAVIGATION */
export const getPagesNavQuery = defineQuery(groq`
    *[_type == 'page' && isActive == true && defined(slug.current)] | order(orderRank asc) {
      "id": coalesce(_id, ""), 
      "name": coalesce(name, title),
      title,
      "slug": select(
        isHome == true => "",
        slug.current
      ),
      isHome,
      orderRank,
      isActive
    }
  `);

const pageFields = /* groq */ `
    "id": _id,
    name,
    "slug": slug.current,
    isActive,
    title,
    resumen,
    content,
    ${seoFields},
    components[isActive == true] | order(orderRank asc) { ${componentFields} }
`;

export const getPageDetailQuery = defineQuery(groq`
    *[_type == 'page' && isActive == true && slug.current == $slug][0] {
    ${pageFields}
    }`);
