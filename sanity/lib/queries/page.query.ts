import groq from 'groq';
import { componentFields } from './component.query';

/* PAGES - NAVIGATION */
export const getPagesNavQuery = groq`
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
  `;

const pageFields = /* groq */ `
    "id": _id,
    name,
    "slug": slug.current,
    isActive,
    title,
    content,
    components[isActive]  { ${componentFields} }
`;

export const getPageDetailQuery = groq`
    *[_type == 'page' && slug.current == $slug][0] {
    ${pageFields}
    }`;
