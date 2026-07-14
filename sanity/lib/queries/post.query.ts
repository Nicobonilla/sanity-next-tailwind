import { defineQuery, groq } from 'next-sanity';
import { unitBusiness } from './unitBusiness.query';
import { componentFields } from './component.query';
import { seoFields } from './seo.query';

/* BLOG - POST */
export const postListFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  ${unitBusiness},
  orderRank,
  "coverImage": coalesce(
    coverImage,
    components[isActive == true && typeComponent->value == "Heading"][0].imageBackground
  ),
  "resumen": coalesce(
    resumen,
    array::join(content[_type == "block" && style == "normal"][0].children[].text, " ")
  ),
  date,
  _updatedAt
  `;

export const postDetailFields = /* groq */ `
  ${postListFields},
  content,
  ${seoFields},
  "author": author->{name, role, credentials, bio, picture},
  components[isActive == true] | order(orderRank asc) { ${componentFields} }
`;

/* BLOG - LISTA DE POSTS */
export const getPostListQuery = defineQuery(groq`
    *[_type == 'post' && coalesce(isActive, true) == true && defined(slug.current)] | order(date desc, orderRank desc) {
      ${postListFields}
      }`);

export const getPostListByUnitBusinessQuery = defineQuery(groq`
    *[_type == 'post' && coalesce(isActive, true) == true && defined(slug.current) && unitBusiness->slug.current == $slug] | order(date desc, orderRank desc) {
      ${postListFields}
      }`);

/* BLOG - DETALLE DE POST */
export const getPostDetailQuery = defineQuery(groq`
  *[_type == 'post' && coalesce(isActive, true) == true && slug.current == $slug][0] {
    ${postDetailFields},
    "tableOfContents" : content[style in ['h2', 'h3']] {
      _key,
      style,
      'text':children[0].text 
    }
  }
`);
