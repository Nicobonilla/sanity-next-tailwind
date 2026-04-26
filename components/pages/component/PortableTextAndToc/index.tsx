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
  articleMeta?: {
    practiceAreaLabel?: string | null;
    publishedLabel?: string | null;
    readingTimeLabel?: string | null;
    summary?: string | null;
    updatedLabel?: string | null;
  } | null;
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
  articleMeta,
  breadcrumbsItems,
  currentPath,
  cta,
  ctaSource = 'content_cta',
  siteIdentity,
}: PortableTextAndTOCProps) {
  const hasPrimaryHeading = articleHasPrimaryHeading(article);
  const hasTableOfContents = Boolean(article?.tableOfContents);
  const metaPills = [
    articleMeta?.practiceAreaLabel,
    articleMeta?.readingTimeLabel,
    articleMeta?.publishedLabel,
    articleMeta?.updatedLabel &&
    articleMeta.updatedLabel !== articleMeta.publishedLabel
      ? articleMeta.updatedLabel
      : null,
  ].filter(Boolean) as string[];

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
        {articleMeta?.summary || metaPills.length ? (
          <div className="mx-2 mb-6 rounded-2xl border border-[color:rgba(31,39,51,0.08)] bg-[color:rgba(245,242,236,0.55)] p-5 sm:p-6">
            {metaPills.length ? (
              <div className="flex flex-wrap gap-2">
                {metaPills.map((item) => (
                  <span
                    className="rounded-full border border-[color:rgba(31,39,51,0.12)] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-primary)]"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
            {articleMeta?.summary ? (
              <p className="mt-4 text-base leading-7 text-[color:var(--color-text-soft)]">
                {articleMeta.summary}
              </p>
            ) : null}
            <p className="mt-4 text-sm leading-6 text-[color:var(--color-text-soft)]">
              Contenido informativo revisado para ofrecer orientacion mas clara
              y actualizada antes de una consulta.
            </p>
          </div>
        ) : null}

        <div className="relative mx-2 flex w-full flex-col gap-4 md:flex-row">
          {hasTableOfContents ? (
            <aside className="order-1 w-full md:sticky md:left-0 md:top-[88px] md:z-40 md:order-2 md:w-1/4">
              <TableOfContents items={article?.tableOfContents || null} />
            </aside>
          ) : null}

          <div className="order-2 mx-2 mb-10 md:order-1 md:w-3/4">
            <div className="prose prose-sm max-w-none prose-headings:scroll-mt-28 sm:prose lg:prose-lg">
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
