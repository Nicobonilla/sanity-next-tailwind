import { defineQuery, groq } from 'next-sanity';

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{"name": coalesce(name, "Anonymous"), picture},
`;

export const heroQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
    content,
    ${postFields}
  }
`);

export const moreStoriesQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content,
    ${postFields}
  }
`);

const componentFields = /* groq */ `
  content,
  image,
  isActive,
  "typeComponentValue": typeComponent->value,
  invertLayoutMobile,
  invertLayoutDesk,
  items[isActive]
`;

/* PAGES */

export const getPagesNavQuery = defineQuery(groq`
  *[_type == 'page' ] | order(position asc) {
  "id": _id,
  "title": title,
  "slug": slug.current,
  position,
  isHome
}`);

export const getPageDetailQuery = defineQuery(groq`
  *[_type == 'page' && slug.current == $slug][0] {
  "id": _id,
  "title": title,
  "slug": slug.current,
  position,
  content,
  components[isActive] { ${componentFields} },
  "isHome": isHome
}`);

/* SERVICES */

export const getServicesNavQuery = defineQuery(
  groq`*[_type == 'service' && isActive] | order(position asc) {
    title,
    isActive,
    "unitBusiness": {
      "title": unitBusiness->title,
      "icon": unitBusiness-> icon,
      "slug": unitBusiness->slug.current
    },
    "slug": slug.current
    }`
);

export const getServiceDetailQuery = defineQuery(
  groq`*[_type == 'service' && slug.current == $slug][0] {
  title,  // Fetch the title of the service
  content,  // Fetch the content of the service
  'tableOfContents': content[style in ['h2', 'h3']] {  // Filter content for headings
    _key,  // Directly include the _key for each heading
    style,  // Include the style of the heading (h2, h3)
    children[] {  // Retrieve all children elements
      text  // Fetch the text from each child element
    }
  },
  components[isActive] { ${componentFields} }
}`
);

export const getComponentListQuery = defineQuery(groq`*[_type == 'component']{
  value, name
}`);

export const getIconListQuery = defineQuery(groq`*[_type == 'icon']{
  value, name
}`);

export const getReactIconListQuery = defineQuery(groq`*[_type == 'reactIcon']{
  iconGroup, iconName
}`);
