import type { Metadata } from 'next';
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
  getPostListFetch,
} from '@/sanity/lib/fetchs/post.fetch';
import { GetPostDetailQueryResult, SettingsQueryResult } from '@/sanity.types';

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
          breadcrumbsItems={breadcrumbsItems}
          currentPath={`https://www.abogadossanfelipe.cl/blog/${slug}`}
          cta={post.contentCta || settings?.defaultContentCta}
          ctaSource={`blog_${slug}`}
          siteIdentity={siteIdentity}
        />
    </section>
  );
}
