import {
  GetPagesNavQueryResult,
  GetServicesNavQueryResult,
} from '@/sanity.types';
import type { Links } from '@/types';

export function formatPages(
  pagesList: GetPagesNavQueryResult,
  servicesList: GetServicesNavQueryResult
): Links[] {
  // Now, we need to process any page that has the title "servicios"
  console.log('pre formated pagesList', pagesList);
  const pagesLink = pagesList.map((page) => {
    if (page.title.toLowerCase() === 'servicios') {
      // If it's the "servicios" page, format its subsections
      return {
        ...page,
        subsections: servicesList as Links[], // Assuming `formatService` takes `servicesList`
      };
    }
    return page;
  });

  // Custom type guard to check if a page is valid Links (i.e., not null and has orderRank)
  function isValidLink(page: any): page is Links {
    return page != null && page.orderRank != null; // Ensures `page` is not null and has a valid `orderRank`
  }
  console.log('formated pages pagesLink', pagesLink.filter(isValidLink));
  // Filter out pages that are invalid and sort them by orderRank
  return pagesLink.filter(isValidLink); // Use the custom type guard to filter out invalid `Links`
}
