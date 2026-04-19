import groq from 'groq';

import { componentFields } from './component.query';
import { contactCtaFields, seoFields } from './fragments';
import { unitBusiness } from './unitBusiness.query';

export const getServicesNavQuery = groq`
  *[_type == 'service' && isActive] | order(unitBusiness->orderRank asc, orderRank asc) {
    "id": coalesce(slug.current, null),
    "title": coalesce(title, null),
    "slug": coalesce(slug.current, null),
    _updatedAt,
    ${unitBusiness},
    seo{
      noIndex
    }
  }
`;

export const getServiceDetailQuery = groq`
  *[_type == 'service' && isActive && slug.current == $slug][0] {
    title,
    iconfyIcon,
    resumen,
    _updatedAt,
    ${contactCtaFields},
    ${seoFields},
    content,
    "tableOfContents": content[style in ['h2']] {
      _key,
      style,
      "text": children[0].text
    },
    ${unitBusiness},
    components[isActive] | order(orderRank asc) { ${componentFields} }
  }
`;
