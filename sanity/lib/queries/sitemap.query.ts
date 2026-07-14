import { defineQuery, groq } from 'next-sanity';

export const sitemapQuery = defineQuery(groq`{
  "pages": *[
    _type == "page" &&
    isActive == true &&
    defined(slug.current) &&
    coalesce(seo.noIndex, false) == false
  ] {
    "slug": slug.current,
    isHome,
    _updatedAt
  },
  "posts": *[
    _type == "post" &&
    coalesce(isActive, true) == true &&
    defined(slug.current) &&
    coalesce(seo.noIndex, false) == false
  ] {
    "slug": slug.current,
    _updatedAt
  },
  "services": *[
    _type == "service" &&
    isActive == true &&
    defined(slug.current) &&
    coalesce(seo.noIndex, false) == false
  ] {
    "slug": slug.current,
    _updatedAt
  },
  "unitBusiness": *[
    _type == "unitBusiness" &&
    coalesce(isActive, true) == true &&
    defined(slug.current) &&
    coalesce(seo.noIndex, false) == false
  ] {
    "slug": slug.current,
    _updatedAt
  }
}`);
