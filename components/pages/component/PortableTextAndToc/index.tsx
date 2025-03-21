import { PortableText } from '@portabletext/react';
import type {
  GetPostDetailQueryResult,
  GetServiceDetailQueryResult,
} from '@/sanity.types';
import { Breadcrumbs } from '../Breadcrumbs';
import { TableOfContents } from './TableOfContents';
import { PTextPost } from './TableOfContents/PTextPost';

interface PortableTextAndTOCProps {
  article: GetPostDetailQueryResult | GetServiceDetailQueryResult;
  breadcrumbsItems: Array<{
    label: string;
    slug: string;
  }>;
}

export default function PortableTextAndTOC({
  article,
  breadcrumbsItems,
}: PortableTextAndTOCProps) {
  return (
    <div className="max-w-screen-lg mx-4 xl:mx-auto">
      <article>
        <Breadcrumbs items={breadcrumbsItems} />
        <h1 className="font-robotoslab text-4xl font-semibold text-slate-700  md:text-5xl mb-4 lg:mb-6">{article?.title}</h1>

        <div className="relative  flex w-full flex-col gap-2 md:flex-row">
          <div className="sticky left-0 top-16 z-40 w-full md:hidden border-b-2 ">
            {article?.tableOfContents && (
              <TableOfContents items={article?.tableOfContents || null} />
            )}
          </div>

          <div className="order-2 md:order-1 md:w-3/4 mb-10 max-w-none ptext-bullet">
            <PortableText
              value={article?.content || []}
              components={PTextPost}
            />
          </div>

          <aside className="hidden md:sticky md:top-[88px] md:order-2 md:block md:w-1/4">
            {article?.tableOfContents && (
              <TableOfContents items={article?.tableOfContents || null} />
            )}
          </aside>
        </div>
      </article>
    </div>
  );
}
