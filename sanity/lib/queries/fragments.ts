export const seoFields = /* groq */ `
  seo{
    metaTitle,
    metaDescription,
    ogTitle,
    ogDescription,
    canonicalUrl,
    noIndex,
    "keywords": keywords[],
    ogImage{
      alt,
      asset
    }
  }
`;

export const contactCtaFields = /* groq */ `
  contentCta{
    isEnabled,
    eyebrow,
    title,
    description,
    primaryLabel,
    secondaryLabel
  }
`;
