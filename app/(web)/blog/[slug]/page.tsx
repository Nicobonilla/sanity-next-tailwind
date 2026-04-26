import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Article, WithContext } from 'schema-dts';

import PageTemplate from '@/components/pages/PageTemplate';
import PortableTextAndToc from '@/components/pages/component/PortableTextAndToc';
import { ComponentsProps } from '@/components/types';
import { normalizePathSegment } from '@/lib/path-utils';
import { portableTextToPlainText } from '@/lib/portable-text';
import { buildSeoMetadata, extractFallbackImage } from '@/lib/seo';
import { resolveSiteIdentity } from '@/lib/site-identity';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { resolveOpenGraphImage } from '@/sanity/lib/image-utils';
import {
  getPostBySlugFetch,
  getPostListByUnitBusinessFetch,
  getPostListFetch,
} from '@/sanity/lib/fetchs/post.fetch';
import { GetPostDetailQueryResult, SettingsQueryResult } from '@/sanity.types';

function formatArticleDate(value?: string | null, prefix?: string) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const label = new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  return prefix ? `${prefix}: ${label}` : label;
}

function isSameCalendarDay(left?: string | null, right?: string | null) {
  if (!left || !right) {
    return false;
  }

  return left.slice(0, 10) === right.slice(0, 10);
}

function estimateReadingMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 180));
}

async function getData(slug: string) {
  try {
    const [post, settings]: [GetPostDetailQueryResult, SettingsQueryResult] =
      await Promise.all([getPostBySlugFetch({ slug }), getSettingsFetch()]);

    return { post, settings };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPostListFetch();

  return (posts || [])
    .filter((post) => Boolean(normalizePathSegment(post.slug)))
    .map((post) => ({
      slug: normalizePathSegment(post.slug)!,
    }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data?.post) {
    return {
      title: 'Articulo no encontrado',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildSeoMetadata({
    title: data.post.title,
    description:
      data.post.resumen || portableTextToPlainText(data.post.content, 160),
    path: `/blog/${slug}`,
    seo: data.post.seo,
    settings: data.settings,
    fallbackImage: extractFallbackImage(data.post.components),
    type: 'article',
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data?.post) {
    notFound();
  }

  const { post, settings } = data;
  const siteIdentity = resolveSiteIdentity(settings);
  const articleSummary =
    post.resumen || portableTextToPlainText(post.content, 260) || null;
  const articlePlainText = portableTextToPlainText(post.content) || '';
  const readingTimeLabel = articlePlainText
    ? `${estimateReadingMinutes(articlePlainText)} min de lectura`
    : null;
  const publishedLabel = formatArticleDate(post.date, 'Publicado');
  const updatedLabel = !isSameCalendarDay(post._updatedAt, post.date)
    ? formatArticleDate(post._updatedAt, 'Actualizado')
    : null;
  const unitBusinessSlug = normalizePathSegment(post.unitBusiness?.slug);
  const relatedPool = unitBusinessSlug
    ? await getPostListByUnitBusinessFetch(unitBusinessSlug)
    : await getPostListFetch();
  const relatedPosts = (relatedPool || [])
    .filter((candidate) => candidate?.slug && candidate.slug !== post.slug)
    .slice(0, 3);

  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title || 'Articulo legal',
    description:
      post.resumen || portableTextToPlainText(post.content, 180) || '',
    datePublished: post.date || post._updatedAt || undefined,
    dateModified: post._updatedAt || post.date || undefined,
    mainEntityOfPage: `https://www.abogadossanfelipe.cl/blog/${slug}`,
    author: {
      '@type': 'Person',
      name: siteIdentity.shortName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteIdentity.firmName,
      url: 'https://www.abogadossanfelipe.cl',
    },
    image:
      resolveOpenGraphImage(
        post.seo?.ogImage || extractFallbackImage(post.components)
      )?.url || undefined,
  };

  const breadcrumbsItems = [
    { label: 'Inicio', slug: 'home' },
    { label: 'Blog', slug: 'blog' },
  ];

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {post.components && (
        <PageTemplate components={post.components as ComponentsProps} />
      )}
        <PortableTextAndToc
          article={post}
          articleMeta={{
            practiceAreaLabel: post.unitBusiness?.title || 'Blog legal',
            publishedLabel,
            readingTimeLabel,
            summary: articleSummary,
            updatedLabel,
          }}
          breadcrumbsItems={breadcrumbsItems}
          currentPath={`https://www.abogadossanfelipe.cl/blog/${slug}`}
          cta={post.contentCta || settings?.defaultContentCta}
          ctaSource={`blog_${slug}`}
          siteIdentity={siteIdentity}
        />
        {relatedPosts.length ? (
          <div className="site-container pb-12 pt-2 sm:pb-16">
            <div className="border-t border-[color:rgba(31,39,51,0.08)] pt-8 sm:pt-10">
              <div className="max-w-3xl">
                <p className="eyebrow">Siga profundizando</p>
                <h2 className="section-subtitle mt-3">
                  Articulos relacionados para reforzar el contexto del caso.
                </h2>
                <p className="section-copy mt-4">
                  Enlaces internos a contenido de la misma materia para mejorar
                  comprension, permanencia y navegacion tematica.
                </p>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => {
                  const relatedSlug = normalizePathSegment(relatedPost.slug);

                  if (!relatedSlug) {
                    return null;
                  }

                  return (
                    <article
                      className="surface-card flex h-full flex-col p-5 sm:p-6"
                      key={relatedSlug}
                    >
                      <p className="legal-kicker">
                        {relatedPost.unitBusiness?.title || 'Blog legal'}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-[color:var(--color-primary)]">
                        <Link href={`/blog/${relatedSlug}`}>
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[color:var(--color-text-soft)] sm:text-base sm:leading-7">
                        {relatedPost.resumen}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-text-soft)]">
                        {relatedPost.date ? (
                          <span>{formatArticleDate(relatedPost.date)}</span>
                        ) : null}
                      </div>
                      <Link
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)]"
                        href={`/blog/${relatedSlug}`}
                      >
                        Leer articulo
                        <span aria-hidden="true">-&gt;</span>
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
    </section>
  );
}
