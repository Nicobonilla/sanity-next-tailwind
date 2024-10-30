import { GetBannerDataQueryResult, GetPagesQueryResult } from '@/sanity.types';

// This represents a single banner object
export type BannerData = GetBannerDataQueryResult[number];

// This type extracts components of type 'banner3Features'
export type Banner3FeaturesComponent =
  GetPagesQueryResult[number]['components'] extends Array<infer U>
    ? U extends { typeComponent: 'banner3Features' }
      ? U
      : never
    : never;

// This extracts the items array from the Banner3FeaturesComponent
export type Banner3FeaturesItemData = Banner3FeaturesComponent extends {
  items: Array<infer Item>;
}
  ? Item
  : never;
