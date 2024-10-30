import { GetPagesQueryResult } from '@/sanity.types';
import { getPagesFetch } from '../lib/fetch';

export type Page = GetPagesQueryResult[number];
export type Component = Page['components'] | null;

export type Item = Component['items'] | null | undefined;

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
    ? components?.filter(
        (component) => component.typeComponent == 'banner3Features'
      )
    : null;
}
