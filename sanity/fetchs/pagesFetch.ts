import type { GetPagesQueryResult as SanGetPagesQueryResult } from '@/sanity.types';
import { getPagesFetch } from '../lib/fetch';
import icon from '../schemas/documents/icon';

export type SanPage = SanGetPagesQueryResult[number];

// Extend the generated type if necessary
export type SanComponent = SanPage['components'];

// Define the Item type as before
export type Item =
  | {
      title: string | null;
      description: string | null;
      isActive?: boolean | null;
      image?: SanityImage | null;
      iconValue?: string | null;
      alt?: string | null;
      position?: number | null;
      content?: Content | null;
    }
  | null
  | undefined;

export async function getCurrentPage(slug: string | undefined) {
  const pages: SanGetPagesQueryResult | null = await getPagesFetch();
  const page = slug
    ? pages?.find((page) => page.slug === slug)
    : pages?.find((page) => page.isHome === true);
  return page;
}

export type Component =
  | {
      title: string | null;
      description: string | null;
      content: Content;
      typeComponentValue: string | null;
      items: Array<Item> | null;
    }
  | null
  | undefined;

export type Page = {
  id: string;
  title: string | null;
  slug: string | null;
  position: number | null;
  content: Content;
  components: Component[];
  isHome: boolean | null;
};

export type SanityImage = {
  asset?: {
    _ref: string;
  };
};

export type TextBlock = Array<{
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: 'span';
    _key: string;
  }>;
  style?: 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'normal';
  listItem?: 'bullet' | 'number';
  markDefs?: Array<{
    href?: string;
    _type: 'link';
    _key: string;
  }>;
  level?: number;
  _type: 'block';
  _key: string;
}>;

export type Content = Array<TextBlock | SanityImage> | null;
