import { defineQuery, groq } from 'next-sanity';
import { componentFields } from './component.query';

/* PAGES - NAVIGATION */
export const getPagesNavQuery = defineQuery(groq`
    *[_type == 'page' && isActive] | order(orderRank asc) {
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
    content,
    components[isActive]  { ${componentFields} }
`;

export const getPageDetailQuery = defineQuery(groq`
    *[_type == 'page' && slug.current == $slug][0] {
    ${pageFields}
    }`);
