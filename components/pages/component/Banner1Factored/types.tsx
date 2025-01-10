import { type PTtype } from '@/components/pages/component/BannerWithItems/PTextBanner';

export interface BannerProps {
  content?: any;
  image?: any;
  items?: any[];
  layout?: {
    invertMobile?: boolean;
    invertDesktop?: boolean;
    imagePosition?: string;
  };
  PTextBanner?: keyof PTtype;
  PTextItem?: keyof PTtype;
  responsiveComponent?: string;
}
