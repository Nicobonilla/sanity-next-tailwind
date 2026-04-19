import { GetPagesNavQueryResult } from '@/sanity.types';
import { SiteIdentity } from '@/lib/site-identity';

import Simple from './Simple';

export default function Footer({
  footerText,
  logo,
  slogan,
  pages,
  siteIdentity,
}: {
  footerText?: string;
  logo?: string | null;
  slogan?: string | null;
  pages: GetPagesNavQueryResult;
  siteIdentity: SiteIdentity;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <Simple
      currentYear={currentYear}
      footerText={footerText}
      logo={logo}
      pages={pages}
      siteIdentity={siteIdentity}
      slogan={slogan}
    />
  );
}
