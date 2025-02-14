import { defineQuery, groq } from 'next-sanity';
import { componentFields } from './component.query';

export const unitBusiness = /* groq */ `
"unitBusiness": {
    "title": coalesce(unitBusiness->title, "Sin título"),
    "icon": coalesce(unitBusiness->icon, "/default-icon.png"),
    "slug": coalesce(unitBusiness->slug.current, "default-slug"),
    "color": coalesce(unitBusiness->color, "bg-gray-100")
  }
`;

export const getUnitBusinessListQuery = defineQuery(groq`
    *[_type == 'unitBusiness'] |  order(orderRank asc) {
      title,
      "slug": slug.current,
      icon,
      color,
      orderRank,
  }`);

const ubFields = /* groq */ `
  "id": _id,
  title,
  "slug": slug.current,
  icon,
  color,
  description,
  "services" : services[] -> {
  title,
  "slug": slug.current,
  iconfyIcon,
  resumen,
  },
  components[isActive] { ${componentFields} }
`;

export const getUnitBusinessDetailQuery = defineQuery(groq`
    *[_type == 'unitBusiness' && slug.current == $slug][0] {
      ${ubFields}

    }`);
