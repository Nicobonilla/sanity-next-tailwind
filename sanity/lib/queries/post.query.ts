import { defineQuery, groq } from 'next-sanity';
import { unitBusiness } from './unitBusiness.query';

/* BLOG - POST */
export const post = /* groq */ `
 title,
  slug,
  ${unitBusiness},
  "resumen": coalesce(
    resumen,
    array::join(content[_type == "block" && style == "normal"][0].children[].text, " ")
  ),
  coverImage,
  alt,
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
export const getPostDetailQuery = defineQuery(
  groq`*[_type == 'post' && slug.current == $slug][0] {
    title,  // Fetch the title of the service
    ${unitBusiness},
    content,  // Fetch the content of the service
    'tableOfContents': content[style in ['h2', 'h3']] {  // Filter content for headings
      _key,
      style,  
      children[] {  
        text  
      }
    },
  }`
);
