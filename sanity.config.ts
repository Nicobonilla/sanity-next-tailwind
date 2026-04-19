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
import page from '@/sanity/schemas/documents/page';
import post from '@/sanity/schemas/documents/post';
import resourceItem from '@/sanity/schemas/documents/resourceItem';
import service from '@/sanity/schemas/documents/service';
import unitBusiness from '@/sanity/schemas/documents/unitBusiness';
import contactCta from '@/sanity/schemas/objects/contactCta';
import seo from '@/sanity/schemas/objects/seo';
import settings from '@/sanity/schemas/singletons/settings';

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
      page,
      post,
      service,
      unitBusiness,
      resourceItem,
      seo,
      contactCta,
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
      previewUrl: {
        origin: 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft',
          disable: '/api/disable',
        },
      },
    }),
    structureTool({ structure: pageStructure([settings]) }),
    singletonPlugin([settings.name]),
    unsplashImageAsset(),
    assistWithPresets(),
    process.env.NODE_ENV === 'development' &&
      visionTool({ defaultApiVersion: apiVersion, defaultDataset: dataset }),
  ].filter(Boolean) as PluginOptions[],
});
