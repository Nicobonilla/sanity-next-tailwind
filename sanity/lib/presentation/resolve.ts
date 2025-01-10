import {
  defineDocuments,
  defineLocations,
  DocumentLocation,
  PresentationPluginOptions,
} from 'sanity/presentation';
import { resolveHref } from '../utils';
import { component } from 'sanity/structure';

const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation;

export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    {
      route: '/',
      filter: `_type == "page" && isHome == true`,
    },
    {
      route: '/:slug',
      filter: `_type == "page" && slug.current == $slug`,
    },
    {
      route: '/services',
      filter: `_type == "service"`,
    },
  ]),
  locations: {
    settings: defineLocations({
      locations: [homeLocation],
      message: 'This document is used on all pages',
      tone: 'caution',
    }),
    component: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
        components: 'components',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: doc?.slug && resolveHref('component', doc?.slug),
            components: doc?.components || [],
          },
          homeLocation,
        ],
      }),
    }),
    page: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
        isHome: 'isHome',
        components: 'components',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: doc?.slug && resolveHref('page', doc?.slug),
            components: doc?.components || [],
          },
          homeLocation,
        ],
      }),
    }),
    service: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
        components: 'components',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: doc?.slug && resolveHref('service', doc?.slug),
            components: doc?.components || [],
          },
        ],
      }),
    }),
  },
};
