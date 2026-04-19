import groq from 'groq';

import { componentFields } from './component.query';
import { seoFields } from './fragments';

export const unitBusiness = /* groq */ `
  "unitBusiness": {
    "title": coalesce(unitBusiness->title, "Sin titulo"),
    "icon": coalesce(unitBusiness->icon, "/default-icon.png"),
    "slug": coalesce(unitBusiness->slug.current, "default-slug"),
    "color": coalesce(unitBusiness->color, "bg-gray-100")
  }
`;

export const getUnitBusinessListQuery = groq`
  *[_type == 'unitBusiness'] | order(orderRank asc) {
    title,
    "slug": slug.current,
    color,
    _updatedAt,
    seo{
      noIndex
    },
    "services": services[]->{
      title,
      "slug": slug.current
    },
    orderRank
  }
`;

const ubFields = /* groq */ `
  "id": _id,
  title,
  "slug": slug.current,
  icon,
  color,
  _updatedAt,
  ${seoFields},
  description,
  "services": services[]->{
    title,
    "slug": slug.current,
    iconfyIcon,
    resumen
  },
  components[isActive] { ${componentFields} }
`;

export const getUnitBusinessDetailQuery = groq`
  *[_type == 'unitBusiness' && slug.current == $slug][0] {
    ${ubFields}
  }
`;
