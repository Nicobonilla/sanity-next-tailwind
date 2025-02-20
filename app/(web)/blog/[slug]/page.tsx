import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';
import { GetPostDetailQueryResult } from '@/sanity.types';
import { getPostBySlugFetch } from '@/sanity/lib/fetchs/post.fetch';
import { PTextPost } from '@/components/pages/component/Posts/PTextPost';
import PageTemplate from '@/components/pages/PageTemplate';
import { Breadcrumbs } from '@/components/pages/component/Breadcrumbs';
import { TableOfContents } from '@/components/pages/component/PortableTextAndToc/TableOfContents';
import PortableTextAndToc from '@/components/pages/component/PortableTextAndToc';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post: GetPostDetailQueryResult = await getData(params.slug);
  return {
    title: post?.title,
    openGraph: {
      title: post?.title || '',
      type: 'article',
    },
    other: {
      'table-of-contents': JSON.stringify(post?.tableOfContents),
    },
  };
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
  if (!post) {
    return <div>Servicio no encontrado.</div>;
  }
  const breadcrumbsItems = [
    { label: 'Inicio', slug: 'home' },
    { label: 'Blogs', slug: 'blog' },
  ];

  return (
    <section>
      {post?.components && <PageTemplate dataPage={post} />}
      <PortableTextAndToc article={post} breadcrumbsItems={breadcrumbsItems} />
    </section>
  );
}
