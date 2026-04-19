import { GetPagesNavQueryResult } from '@/sanity.types';

import Simple from './Simple';

export default function Footer({
  logo,
  slogan,
  pages,
}: {
  logo?: string | null;
  slogan?: string | null;
  pages: GetPagesNavQueryResult;
}) {
  return <Simple logo={logo} pages={pages} slogan={slogan} />;
}
