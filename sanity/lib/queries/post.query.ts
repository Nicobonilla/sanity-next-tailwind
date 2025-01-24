import { defineQuery, groq } from 'next-sanity';
import { unitBusiness } from './unitBusiness.query';
import { componentFields } from './component.query';

/* BLOG - POST */
export const post = /* groq */ `
  title,
  slug,
  ${unitBusiness},
  components[isActive] { ${componentFields} },
  "resumen": coalesce(
    resumen,
    array::join(content[_type == "block" && style == "normal"][0].children[].text, " ")
  ),
  date
  `;

/* BLOG - LISTA DE POSTS */
export const getPostListQuery = defineQuery(groq`
    *[_type == 'post'] {
      ${post}
      }`);

export const getPostListByUnitBusinessQuery = defineQuery(groq`
    *[_type == 'post' && unitBusiness->slug.current == $slug] {
      ${post}
      }`);

/* BLOG - DETALLE DE POST */
export const getPostDetailQuery = defineQuery(groq`
  *[_type == 'post' && slug.current == $slug][0] {
    ${post},
    content,
    "tableOfContents" : content[style in ['h2', 'h3']] {
      _key,
      style,
      'text':children[0].text 
    }
  }
`);
