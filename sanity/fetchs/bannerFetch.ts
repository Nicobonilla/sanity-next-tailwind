import { GetBannerDataQueryResult } from '@/sanity.types';

export type BannerData = GetBannerDataQueryResult[number];

export type ItemData = BannerData['items'] ;
