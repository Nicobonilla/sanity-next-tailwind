import { defineQuery, groq } from "next-sanity";

export const unitBusiness = /* groq */ `
"unitBusiness": {
    "title": coalesce(unitBusiness->title, "Sin título"),
    "icon": coalesce(unitBusiness->icon, "/default-icon.png"),
    "slug": coalesce(unitBusiness->slug.current, "default-slug"),
    "color": coalesce(unitBusiness->color, "bg-gray-100")
  }
`;

export const getUnitBusinessListQuery = defineQuery(groq`
    *[_type == 'unitBusiness'] {
      title,
      icon,
      color,
      "slug": slug.current
  }`);
