import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';
import { GetPostDetailQueryResult } from '@/sanity.types';
import { getPostBySlugFetch } from '@/sanity/lib/fetchs/post.fetch';
import { PTextPost } from '@/components/pages/component/Posts/PTextPost';
import PageTemplate from '@/components/pages/PageTemplate';
import { Breadcrumbs } from '@/components/pages/component/Breadcrumbs';
import { TableOfContents } from '@/components/pages/component/TableOfContents';

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
      <div className="mx-auto max-w-screen-xl">
        <article>
          <Breadcrumbs items={breadcrumbsItems} />
          <h1 className="h2 mb-2 ml-2 lg:mb-6">{post.title}</h1>

          <div className="relative mx-2 flex w-full flex-col gap-2 md:flex-row">
            <div className="sticky left-0 top-16 z-40 w-full md:hidden">
              {post?.tableOfContents && (
                <TableOfContents items={post?.tableOfContents || null} />
              )}
            </div>

            <div className="order-2 md:order-1 md:w-3/4">
              <div className="prose prose-sm max-w-none">
                <PortableText
                  value={post.content || []}
                  components={PTextPost}
                />
              </div>
            </div>

            <aside className="hidden md:sticky md:top-[88px] md:order-2 md:block md:w-1/4">
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
