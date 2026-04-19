import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Article, WithContext } from 'schema-dts';

import PageTemplate from '@/components/pages/PageTemplate';
import PortableTextAndToc from '@/components/pages/component/PortableTextAndToc';
import { ComponentsProps } from '@/components/types';
import { portableTextToPlainText } from '@/lib/portable-text';
import { buildSeoMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { resolveOpenGraphImage } from '@/sanity/lib/image-utils';
import { getPostBySlugFetch } from '@/sanity/lib/fetchs/post.fetch';
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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getData(params.slug);

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
    path: `/blog/${params.slug}`,
    seo: data.post.seo,
    settings: data.settings,
    fallbackImage: data.post.components?.[0]?.imageBackground,
    type: 'article',
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);

  if (!data?.post) {
    notFound();
  }

  const { post, settings } = data;

  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title || 'Articulo legal',
    description:
      post.resumen || portableTextToPlainText(post.content, 180) || '',
    datePublished: post.date || post._updatedAt || undefined,
    dateModified: post._updatedAt || post.date || undefined,
    mainEntityOfPage: `https://www.abogadossanfelipe.cl/blog/${params.slug}`,
    author: {
      '@type': 'Person',
      name: siteConfig.shortName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.firmName,
      url: 'https://www.abogadossanfelipe.cl',
    },
    image:
      resolveOpenGraphImage(
        post.seo?.ogImage || post.components?.[0]?.imageBackground
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
        cta={post.contentCta || settings?.defaultContentCta}
        ctaSource={`blog_${params.slug}`}
      />
    </section>
  );
}
