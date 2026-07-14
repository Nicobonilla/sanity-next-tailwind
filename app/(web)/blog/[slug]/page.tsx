import { Metadata } from 'next';
import { GetPostDetailQueryResult } from '@/sanity.types';
import { getPostBySlugFetch } from '@/sanity/lib/fetchs/post.fetch';
import PageTemplate from '@/components/pages/PageTemplate';
import PortableTextAndToc from '@/components/pages/component/PortableTextAndToc';
import { ComponentsProps } from '@/components/types';
import { BlogPosting, WithContext } from 'schema-dts';
import {
  buildDocumentMetadata,
  serializeJsonLd,
  type SeoDocument,
} from '@/sanity/lib/seo';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post: GetPostDetailQueryResult = await getData(params.slug);
  if (!post) notFound();

  return buildDocumentMetadata({
    document: post,
    path: `/blog/${params.slug}`,
    fallbackImage: post?.coverImage || post?.components?.[0]?.imageBackground,
    type: 'article',
  });
}

async function getData(slug: string) {
  try {
    const post: GetPostDetailQueryResult | null = await getPostBySlugFetch({
      slug,
    });
    return post;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getData(params.slug);
  if (!post) notFound();
  const seoPost = post as unknown as SeoDocument & {
    author?: { name?: string | null } | null;
  };

  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    name: post?.title || 'Abogados San Felipe',
    headline: post?.title || undefined,
    description: seoPost.seo?.metaDescription || post.resumen || undefined,
    datePublished: post.date || undefined,
    dateModified: post._updatedAt || post.date || undefined,
    author: seoPost.author?.name
      ? { '@type': 'Person', name: seoPost.author.name }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Abogados San Felipe - Sebastián Bonilla Marín',
      url: 'https://www.abogadossanfelipe.cl',
    },
    mainEntityOfPage: `https://www.abogadossanfelipe.cl/blog/${params.slug}`,
  };
  const breadcrumbsItems = [
    { label: 'Inicio', slug: 'home' },
    { label: 'Blog', slug: 'blog' },
  ];

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      {post?.components && (
        <PageTemplate components={post.components as ComponentsProps} />
      )}
      <PortableTextAndToc article={post} breadcrumbsItems={breadcrumbsItems} />
    </section>
  );
}
