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

export const bookingFields = /* groq */ `
  booking{
    isEnabled,
    title,
    description,
    buttonLabel,
    bookingUrl,
    availabilityNote,
    durationLabel,
    priceLabel
  }
`;

export const reviewProfileFields = /* groq */ `
  reviewProfiles[]{
    platform,
    rating,
    reviewCount,
    summary,
    reviewUrl,
    ctaLabel
  }
`;

export const serviceLandingFields = /* groq */ `
  landing{
    intro,
    situationsTitle,
    "situations": situations[],
    deliverablesTitle,
    "deliverables": deliverables[],
    documentsTitle,
    "documents": documents[],
    processTitle,
    processSteps[]{
      step,
      title,
      description
    },
    faqTitle,
    faqItems[]{
      question,
      answer
    }
  }
`;
