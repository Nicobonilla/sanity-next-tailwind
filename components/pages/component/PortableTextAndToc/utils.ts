import {
  GetPostDetailQueryResult,
  GetServiceDetailQueryResult,
} from '@/sanity.types';

const PRIMARY_HEADING_COMPONENTS = new Set([
  'background',
  'banner1',
  'banner2',
  'banner4images',
  'bannerlist',
  'bannerposts',
  'bannerservices',
  'bannerwithitems',
  'heading',
  'heroform',
  'heroimage',
  'herovideo',
]);

type ArticleValue = GetPostDetailQueryResult | GetServiceDetailQueryResult;
type ComponentWithTypeValue = {
  typeComponentValue?: string | null;
};

export function articleHasPrimaryHeading(article: ArticleValue) {
  const firstComponent = article?.components?.[0] as
    | ComponentWithTypeValue
    | undefined;
  const typeValue =
    typeof firstComponent?.typeComponentValue === 'string'
      ? firstComponent.typeComponentValue.replace(/\s+/g, '').toLowerCase()
      : null;

  return Boolean(typeValue && PRIMARY_HEADING_COMPONENTS.has(typeValue));
}
