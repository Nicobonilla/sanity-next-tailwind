import groq from 'groq';

import { componentFields } from './component.query';
import { seoFields } from './fragments';

export const getPagesNavQuery = groq`
  *[_type == 'page' && isActive] | order(orderRank asc) {
    "id": coalesce(_id, ''),
    "name": coalesce(name, title),
    title,
    "slug": select(
      isHome == true => '',
      slug.current
    ),
    isHome,
    orderRank,
    isActive,
    "showInNavbar": coalesce(showInNavbar, true),
    "showInFooter": coalesce(showInFooter, true),
    _updatedAt,
    seo{
      noIndex
    }
  }
`;

const pageFields = /* groq */ `
  "id": _id,
  name,
  "slug": slug.current,
  isActive,
  title,
  resumen,
  isHome,
  "showInNavbar": coalesce(showInNavbar, true),
  "showInFooter": coalesce(showInFooter, true),
  _updatedAt,
  ${seoFields},
  content,
  components[isActive] { ${componentFields} }
`;

export const getPageDetailQuery = groq`
  *[_type == 'page' && isActive && slug.current == $slug][0] {
    ${pageFields}
  }
`;
