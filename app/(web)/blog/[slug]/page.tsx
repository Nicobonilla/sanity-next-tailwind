import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';
import { GetPostDetailQueryResult } from '@/sanity.types';
import { getPostBySlugFetch } from '@/sanity/lib/fetchs/post.fetch';
import { PTextPost } from '@/components/pages/component/Posts/PTextPost';
import PageTemplate from '@/components/pages/PageTemplate';
import { TableOfContents } from '@/components/pages/component/Posts/TableOfContents';
import { Breadcrumbs } from '@/components/pages/component/Posts/Breadcrumbs';

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
    { label: 'Inicio', href: '/', slug: 'home' },
    { label: 'Blog', href: '/blog', slug: 'blog' },
    {
      label: post?.title || 'Sin título',
      href: `/blog/${params.slug}`,
      slug: params.slug,
    },
  ];
  //console.log('post', post);
  return (
    <section>
      {post?.components && <PageTemplate dataPage={post} />}
      <div className="mx-auto mt-5 max-w-screen-xl">
        <article>
          <Breadcrumbs items={breadcrumbsItems} />
          <div className="flex w-full flex-col gap-14 md:flex-row">
            <div className="order-2 md:order-1 md:w-3/4">
              <div className="prose prose-sm max-w-none">
                <PortableText
                  value={post.content || []}
                  components={PTextPost}
                />
              </div>
            </div>

            {/* Sidebar: Table of Contents - Ponemos el aside a la derecha en pantallas medianas o más grandes */}
            <aside className="order-1 md:sticky md:top-24 md:order-2 md:max-h-fit md:w-1/4 md:self-start">
              {post?.tableOfContents && (
                <TableOfContents items={post?.tableOfContents || null} />
              )}
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
}
