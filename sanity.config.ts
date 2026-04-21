'use client';
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/(sanity)/studio/[[...tool]]/page.tsx` route
 */
import { colorInput } from '@sanity/color-input';
import { visionTool } from '@sanity/vision';
import { inlineSvgInput } from '@focus-reactive/sanity-plugin-inline-svg-input';
import { PluginOptions, defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { IconManager } from 'sanity-plugin-icon-manager';
import { media } from 'sanity-plugin-media';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';

import { assistWithPresets } from '@/sanity/plugins/assist';
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings';
import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api';
import { resolve } from '@/sanity/lib/presentation/resolve';
import author from '@/sanity/schemas/documents/author';
import background from '@/sanity/schemas/documents/background';
import banner from '@/sanity/schemas/documents/banner';
import colorItem from '@/sanity/schemas/documents/colorItem';
import component from '@/sanity/schemas/documents/component';
import { IconsList, IconsListItem } from '@/sanity/schemas/documents/IconsList';
import item from '@/sanity/schemas/documents/item';
import layer from '@/sanity/schemas/documents/layer';
import homePage from '@/sanity/schemas/documents/homePage';
import page from '@/sanity/schemas/documents/page';
import post from '@/sanity/schemas/documents/post';
import resourceItem from '@/sanity/schemas/documents/resourceItem';
import service from '@/sanity/schemas/documents/service';
import unitBusiness from '@/sanity/schemas/documents/unitBusiness';
import bookingSettings from '@/sanity/schemas/objects/bookingSettings';
import contactCta from '@/sanity/schemas/objects/contactCta';
import faqItem from '@/sanity/schemas/objects/faqItem';
import homeFaqSection from '@/sanity/schemas/objects/homeFaqSection';
import homeFirmIntroSection from '@/sanity/schemas/objects/homeFirmIntroSection';
import homeHeroSection from '@/sanity/schemas/objects/homeHeroSection';
import homeLeadershipSection from '@/sanity/schemas/objects/homeLeadershipSection';
import homePracticeAreasSection from '@/sanity/schemas/objects/homePracticeAreasSection';
import homeProcessSection from '@/sanity/schemas/objects/homeProcessSection';
import labelValueItem from '@/sanity/schemas/objects/labelValueItem';
import processStep from '@/sanity/schemas/objects/processStep';
import reviewProfile from '@/sanity/schemas/objects/reviewProfile';
import seo from '@/sanity/schemas/objects/seo';
import sectionHeading from '@/sanity/schemas/objects/sectionHeading';
import serviceLanding from '@/sanity/schemas/objects/serviceLanding';
import trustItem from '@/sanity/schemas/objects/trustItem';
import settings from '@/sanity/schemas/singletons/settings';

const rawPreviewOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  'http://localhost:3000';

const previewOrigin = rawPreviewOrigin.startsWith('http')
  ? rawPreviewOrigin
  : `https://${rawPreviewOrigin}`;

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  schema: {
    types: [
      settings,
      author,
      background,
      banner,
      colorItem,
      component,
      IconsList,
      IconsListItem,
      item,
      layer,
      homePage,
      page,
      post,
      service,
      unitBusiness,
      resourceItem,
      seo,
      bookingSettings,
      contactCta,
      sectionHeading,
      trustItem,
      labelValueItem,
      processStep,
      faqItem,
      reviewProfile,
      serviceLanding,
      homeHeroSection,
      homeFirmIntroSection,
      homePracticeAreasSection,
      homeLeadershipSection,
      homeProcessSection,
      homeFaqSection,
    ],
  },
  plugins: [
    colorInput(),
    media({
      creditLine: {
        enabled: true,
        excludeSources: ['unsplash'],
      },
      maximumUploadSize: 10000000,
    }),
    IconManager({}),
    inlineSvgInput(),
    presentationTool({
      resolve,
      allowOrigins: [previewOrigin, 'http://127.0.0.1:3000'],
      previewUrl: {
        initial: `${previewOrigin.replace(/\/$/, '')}/`,
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
    structureTool({ structure: pageStructure([settings, homePage]) }),
    singletonPlugin([settings.name, homePage.name]),
    unsplashImageAsset(),
    assistWithPresets(),
    process.env.NODE_ENV === 'development' &&
      visionTool({ defaultApiVersion: apiVersion, defaultDataset: dataset }),
  ].filter(Boolean) as PluginOptions[],
});
