import {
  GetPagesNavQueryResult,
  GetServicesNavQueryResult,
  GetUnitBusinessListQueryResult,
} from '@/sanity.types';
import type { Links } from '@/types';

export function formatPages(
  pagesList: GetPagesNavQueryResult,
  servicesList: GetServicesNavQueryResult,
  ub: GetUnitBusinessListQueryResult
): Links[] {
  // Type guard to check if a page is valid Links (i.e., not null and has orderRank)
  const isValidLink = (page: any): page is Links =>
    page != null && page.orderRank != null;

  // Process pages, formatting subsections for the "servicios" page
  const formattedPages = pagesList.map((page) =>
    page?.slug && page?.slug.toLowerCase() === 'services'
      ? { ...page, subsections: servicesList as Links[] }
      : { ...page }
  );

  // Filter out invalid pages and return sorted by orderRank
  return formattedPages.filter(isValidLink);
}
