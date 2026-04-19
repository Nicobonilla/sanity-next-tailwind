import groq from 'groq';

import { seoFields } from './fragments';

export const getHomePageQuery = groq`
  *[_type == "homePage"][0]{
    hero{
      eyebrow,
      title,
      description,
      panelTitle,
      heroImage{
        alt,
        asset
      },
      leaderLabel,
      areasLabel,
      areasSuffix,
      contactLabel,
      "trustBullets": trustBullets[],
      primaryLabel,
      secondaryLabel
    },
    trustItems[]{
      title,
      description
    },
    firmIntro{
      heading{
        eyebrow,
        title,
        description
      },
      "paragraphs": paragraphs[],
      cards[]{
        label,
        value
      }
    },
    practiceAreas{
      heading{
        eyebrow,
        title,
        description
      },
      maxItems,
      servicesLabel,
      detailLabel
    },
    leadership{
      heading{
        eyebrow,
        title,
        description
      },
      leaderNameOverride,
      leaderCardLabel,
      "bullets": bullets[]
    },
    process{
      heading{
        eyebrow,
        title,
        description
      },
      steps[]{
        step,
        title,
        description
      }
    },
    faq{
      heading{
        eyebrow,
        title,
        description
      },
      items[]{
        question,
        answer
      }
    },
    finalCta{
      isEnabled,
      eyebrow,
      title,
      description,
      primaryLabel,
      secondaryLabel
    },
    ${seoFields}
  }
`;
