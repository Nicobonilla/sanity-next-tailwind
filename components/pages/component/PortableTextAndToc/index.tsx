import { PortableText } from '@portabletext/react';
import {
  GetPostDetailQueryResult,
  GetServiceDetailQueryResult,
} from '@/sanity.types';
import { Breadcrumbs } from '../Breadcrumbs';
import { TableOfContents } from './TableOfContents';
import { PTextPost } from '../Posts/PTextPost';

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
    <div className="mx-auto max-w-screen-xl">
      <article>
        <Breadcrumbs items={breadcrumbsItems} />
        <h1 className="h2 mb-2 ml-2 lg:mb-6">{article?.title}</h1>

        <div className="relative mx-2 flex w-full flex-col gap-2 md:flex-row">
          <div className="sticky left-0 top-16 z-40 w-full md:hidden">
            {article?.tableOfContents && (
              <TableOfContents items={article?.tableOfContents || null} />
            )}
          </div>

          <div className="order-2 md:order-1 md:w-3/4">
            <div className="prose prose-sm max-w-none">
              <PortableText
                value={article?.content || []}
                components={PTextPost}
              />
            </div>
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
