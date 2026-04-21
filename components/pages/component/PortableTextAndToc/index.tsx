import ContentContactCta from '@/components/content/ContentContactCta';
import { PortableText } from '@portabletext/react';
import {
  GetPostDetailQueryResult,
  GetServiceDetailQueryResult,
} from '@/sanity.types';
import { SiteIdentity } from '@/lib/site-identity';
import { Breadcrumbs } from '../Breadcrumbs';
import { TableOfContents } from './TableOfContents';
import { PTextPost } from '../Posts/PTextPost';
import { articleHasPrimaryHeading } from './utils';

interface PortableTextAndTOCProps {
  article: GetPostDetailQueryResult | GetServiceDetailQueryResult;
  breadcrumbsItems: Array<{
    label: string;
    slug: string;
  }>;
  currentPath?: string;
  cta?: {
    description?: string | null;
    eyebrow?: string | null;
    isEnabled?: boolean | null;
    primaryLabel?: string | null;
    secondaryLabel?: string | null;
    title?: string | null;
  } | null;
  ctaSource?: string;
  siteIdentity: SiteIdentity;
}

export default function PortableTextAndTOC({
  article,
  breadcrumbsItems,
  currentPath,
  cta,
  ctaSource = 'content_cta',
  siteIdentity,
}: PortableTextAndTOCProps) {
  const hasPrimaryHeading = articleHasPrimaryHeading(article);
  const hasTableOfContents = Boolean(article?.tableOfContents);

  return (
    <div className="mx-auto max-w-screen-xl">
      <article>
        <Breadcrumbs
          currentLabel={article?.title || undefined}
          currentPath={currentPath}
          items={breadcrumbsItems}
        />
        {!hasPrimaryHeading ? (
          <h1 className="h2 mb-2 ml-2 lg:mb-6">{article?.title}</h1>
        ) : null}

        <div className="relative mx-2 flex w-full flex-col gap-2 md:flex-row">
          {hasTableOfContents ? (
            <aside className="sticky left-0 top-16 z-40 order-1 w-full md:top-[88px] md:order-2 md:w-1/4">
              <TableOfContents items={article?.tableOfContents || null} />
            </aside>
          ) : null}

          <div className="order-2 mx-2 mb-10 md:order-1 md:w-3/4">
            <div className="prose prose-sm max-w-none">
              <PortableText
                value={article?.content || []}
                components={PTextPost}
              />
            </div>
            <ContentContactCta cta={cta} siteIdentity={siteIdentity} source={ctaSource} />
          </div>
        </div>
      </article>
    </div>
  );
}
