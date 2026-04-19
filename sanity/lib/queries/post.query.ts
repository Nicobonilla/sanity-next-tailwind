import groq from 'groq';

import { componentFields } from './component.query';
import { contactCtaFields, seoFields } from './fragments';
import { unitBusiness } from './unitBusiness.query';

export const post = /* groq */ `
  title,
  "slug": slug.current,
  ${unitBusiness},
  orderRank,
  _updatedAt,
  components[isActive] | order(orderRank asc) { ${componentFields} },
  "resumen": coalesce(
    resumen,
    array::join(content[_type == "block" && style == "normal"][0].children[].text, " ")
  ),
  date,
  ${contactCtaFields},
  ${seoFields}
`;

export const getPostListQuery = groq`
  *[_type == 'post'] | order(orderRank desc) {
    ${post}
  }
`;

export const getPostListByUnitBusinessQuery = groq`
  *[_type == 'post' && unitBusiness->slug.current == $slug] | order(orderRank desc) {
    ${post}
  }
`;

export const getPostDetailQuery = groq`
  *[_type == 'post' && slug.current == $slug][0] {
    ${post},
    content,
    "tableOfContents": content[style in ['h2', 'h3']] {
      _key,
      style,
      "text": children[0].text
    }
  }
`;
