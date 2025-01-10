import { type ComponentProps } from '@/components/pages/PageTemplate';
import clsx from 'clsx';
import { SimpleBanner } from './variants/SimpleBanner';
import { SideImageBanner } from './variants/SideImageBanner';
import { OverlayBanner } from './variants/OverlayBanner';
import { WithItemsBanner } from './variants/WithItemsBanner';
import { GridListBanner } from './variants/GridListBanner';

const BANNER_VARIANTS = {
  SIMPLE: 'simple',
  WITH_SIDE_IMAGE: 'withSideImage',
  WITH_ITEMS: 'withItems',
  GRID_LIST: 'gridList',
  OVERLAY: 'overlay',
} as const;

export function Banner1({ data }: { data: ComponentProps }) {
  const { variant, layout } = data;

  const containerStyles = clsx(
    'relative w-full',
    variant === BANNER_VARIANTS.OVERLAY &&
      'form-h overflow-hidden p-8 md:p-0 md:px-2',
    variant === BANNER_VARIANTS.WITH_ITEMS &&
      layout?.imagePosition === 'background' &&
      'min-h-screen md:min-h-0 lg:max-h-fit'
  );

  return (
    <div className={containerStyles}>
      {variant === BANNER_VARIANTS.SIMPLE && <SimpleBanner {...data} />}
      {variant === BANNER_VARIANTS.WITH_SIDE_IMAGE && <SideImageBanner {...data} />}
      {variant === BANNER_VARIANTS.OVERLAY && <OverlayBanner {...data} />}
      {variant === BANNER_VARIANTS.WITH_ITEMS && <WithItemsBanner {...data} />}
      {variant === BANNER_VARIANTS.GRID_LIST && <GridListBanner {...data} />}
    </div>
  );
}
