import { GetPagesQueryResult } from '@/sanity.types';
import { getPagesFetch } from '../lib/fetch';

export type Page = GetPagesQueryResult[number];

// Extend the generated type if necessary
export type Component = Page['components']  & {
  items: Item[] | null; // Ensure items is correctly defined
};

// Define the Item type as before
export type Item = {
  title: string | null;
  description: string | null;
  isActive?: boolean | null;
  image?: any | null;
  alt?: string | null;
  position?: number | null;
  content?: any | null;
};


export async function getHomeData() {
  const pages: GetPagesQueryResult | null = await getPagesFetch();
  return pages ? pages.find((page) => page.isHome === true) : null;
}

export async function getCurrentPage(slug: string) {
  const pages: GetPagesQueryResult | null = await getPagesFetch();
  return pages ? pages?.find((page) => page.slug === slug) : null;
}

export async function getComponentsCurrentPage(slug: string) {
  const currentPage: Page = (await getCurrentPage(slug)) || ({} as Page);
  return currentPage.components ? currentPage.components : null;
}

export async function getItemsCurrentComponent(slug: string) {
  const components = (await getComponentsCurrentPage(slug)) || null;
  console.log('components', components);
  return components
    ? components.flatMap((component) => component.items || [])
    : null;
}
