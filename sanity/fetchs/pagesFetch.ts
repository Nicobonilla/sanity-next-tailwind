import { GetPagesQueryResult } from '@/sanity.types';
import { getPagesFetch } from '../lib/fetch';

export type Page = GetPagesQueryResult[number] | null | undefined;

export async function getHomeData() {
  const pages: GetPagesQueryResult | null = await getPagesFetch();

  const homeData: Page | null | undefined = pages?.find(
    (page) => page.isHome === true
  );
  return homeData;
}

export async function getCurrentPage(slug: string) {
  const pages: GetPagesQueryResult | null = await getPagesFetch();

  const currentPage: Page = pages?.find((page) => page.slug === slug);
  return currentPage;
}
