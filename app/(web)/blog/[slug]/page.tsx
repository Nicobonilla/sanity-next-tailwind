import { PortableText, PortableTextComponents } from '@portabletext/react';
import { Metadata } from 'next';
import { TableOfContents } from '@/components/pages/services/TableOfContents';
import { Breadcrumbs } from '@/components/pages/services/Breadcrumbs';
import { GetPostDetailQueryResult } from '@/sanity.types';
import { PTServices } from '@/components/pages/services/PTServices';
import { getPostBySlugFetch } from '@/sanity/lib/fetchs/post.fetch';

interface TableOfContents {
  id: string;
  title: string;
  level: number;
}

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
    const post: GetPostDetailQueryResult = await getPostBySlugFetch(slug);
    return post;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post: GetPostDetailQueryResult = await getData(params.slug);

  if (!post) {
    return <div>Servicio no encontrado.</div>; // Manejo básico de errores
  }

  return (
    <div className="max-w-xl">
      <article>
        {/*<Breadcrumbs
        servicios={{
          label: post.title,
          href: '/servicios',
          slug: params.slug,
        }}
      /> */}
        <h1 className="h2 mb-6">{post.title}</h1>

        <div className="flex flex-col gap-14 md:flex-row">
          {/* Main Content: Asegura que el contenido principal esté a la izquierda */}
          <div className="order-2 md:order-1 md:w-3/4">
            <div className="prose prose-sm max-w-none">
              <PortableText
                value={post.content || []}
                components={PTServices}
              />
            </div>
          </div>

          {/* Sidebar: Table of Contents - Ponemos el aside a la derecha en pantallas medianas o más grandes */}
          <aside className="order-1 md:sticky md:top-24 md:order-2 md:max-h-fit md:w-1/4 md:self-start">
            <TableOfContents
              items={post.tableOfContents ? post.tableOfContents : []}
            />
          </aside>
        </div>
      </article>
    </div>
  );
}
