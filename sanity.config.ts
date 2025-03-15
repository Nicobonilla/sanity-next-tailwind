'use client';
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/(sanity)/studio/[[...tool]]/page.tsx` route
 */
import { visionTool } from '@sanity/vision';
import { type PluginOptions, defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api';
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings';

import { resolve } from './sanity/lib/presentation/resolve';

import { assistWithPresets } from '@/sanity/plugins/assist';
import { inlineSvgInput } from '@focus-reactive/sanity-plugin-inline-svg-input';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { IconManager } from 'sanity-plugin-icon-manager';
import { media } from 'sanity-plugin-media';
import { colorInput } from '@sanity/color-input';

import settings from '@/sanity/schemas/singletons/settings';

import author from '@/sanity/schemas/documents/author';
import post from '@/sanity/schemas/documents/post';
import service from './sanity/schemas/documents/service';
import banner from './sanity/schemas/documents/banner';
import unitBusiness from './sanity/schemas/documents/unitBusiness';
import page from './sanity/schemas/documents/page';
import item from './sanity/schemas/documents/item';
import component from './sanity/schemas/documents/component';
import { IconsList, IconsListItem } from './sanity/schemas/documents/IconsList';
import background from './sanity/schemas/documents/background';
import layer from './sanity/schemas/documents/layer';
import colorItem from './sanity/schemas/documents/colorItem';
import resourceItem from './sanity/schemas/documents/resourceItem';

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  schema: {
    types: [
      // Singletons
      settings,
      // Documents
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
    ],
  },
  plugins: [
    colorInput(),
    media({
      creditLine: {
        enabled: true,
        // boolean - enables an optional "Credit Line" field in the plugin.
        // Used to store credits e.g. photographer, licence information
        excludeSources: ['unsplash'],
        // string | string[] - when used with 3rd party asset sources, you may
        // wish to prevent users overwriting the creditLine based on the `source.name`
      },
      maximumUploadSize: 10000000,
      // number - maximum file size (in bytes) that can be uploaded through the plugin interface
    }),
    IconManager({}),
    inlineSvgInput(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    presentationTool({
      resolve : resolve as NonNullable<typeof resolve>,
      previewUrl: {
        origin: 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft',
          disable: '/api/disable',
        },
      },
    }),
    structureTool({ structure: pageStructure([settings]) }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([settings.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Sets up AI Assist with preset prompts
    // https://www.sanity.io/docs/ai-assist
    assistWithPresets(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    process.env.NODE_ENV === 'development' &&
      visionTool({ defaultApiVersion: apiVersion, defaultDataset: dataset }),
  ].filter(Boolean) as PluginOptions[],
});
