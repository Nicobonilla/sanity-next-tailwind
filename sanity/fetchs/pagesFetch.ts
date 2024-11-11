import { IconProps } from '@sanity/icons';
import icon from '../schemas/documents/icon';
import type {
  GetServiceDetailQueryResult,
  IconManager,
  internalGroqTypeReferenceTo,
  GetPageDetailQueryResult as SanGetPageDetailQueryResult,
  SanityImageCrop,
  SanityImageHotspot,
} from '@/sanity.types';

export type SanPage = SanGetPageDetailQueryResult;
export type SanServPage = GetServiceDetailQueryResult;

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

export type SanityImage = {
  asset?: {
    _ref: string;
  };
};

export type Content = Array<
  | {
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
    }
  | {
      asset?: {
        _ref: string;
        _type: 'reference';
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: 'image';
      _key: string;
    }
> | null;

// Define the Item type as before
export type Item =
  | {
      isActive?: boolean | null;
      image?: SanityImage | null;
      iconValue?: string | null;
      alt?: string | null;
      iconManager?: IconProps | null;
      position?: number | null;
      content?: Content | null;
    }
  | null
  | undefined;

export type Component =
  | {
      content: Content;
      image: SanityImage | null;
      isActive: boolean | null;
      typeComponentValue: string | null;
      invertLayoutMobile: boolean | null;
      invertLayoutDesk: boolean | null;
      items: Array<Item> | null;
    }
  | null
  | undefined;

export type Page = {
  id: string;
  title: string | null;
  slug: string | null;
  isActive: boolean | null;
  isHome: boolean | null;
  position: number | null;
  content: Content;
  components: Component[];
};
