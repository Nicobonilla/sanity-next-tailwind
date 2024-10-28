import { PortableText, PortableTextComponents } from '@portabletext/react';
import { getServiceBySlugFetch } from '@/sanity/lib/fetch';
import { Metadata } from 'next';
import { TableOfContents } from '@/components/pages/services/TableOfContents';
import { Breadcrumbs } from '@/components/pages/services/Breadcrumbs';
import { GetServiceDetailQueryResult } from '@/sanity.types';
import { PTServices } from '@/components/shared/PortableText/PTServices';

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
  const service: GetServiceDetailQueryResult = await getServiceBySlugFetch(
    params.slug
  );
  return {
    title: service?.title,
    openGraph: {
      title: service?.title || '',
      type: 'article',
    },
    other: {
      'table-of-contents': JSON.stringify(service?.tableOfContents),
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const service: GetServiceDetailQueryResult = await getServiceBySlugFetch(
    params.slug
  );

  if (!service) {
    return <div>Servicio no encontrado.</div>; // Manejo básico de errores
  }

  return (
    <article>
      {/*<Breadcrumbs
        servicios={{
          label: service.title,
          href: '/servicios',
          slug: params.slug,
        }}
      /> */}
      <h1 className="h2 mb-6">{service.title}</h1>

      <div className="flex flex-col gap-14 md:flex-row">
        {/* Main Content: Asegura que el contenido principal esté a la izquierda */}
        <div className="order-2 md:order-1 md:w-3/4">
          <div className="prose prose-sm max-w-none">
            <PortableText
              value={service.content || []}
              components={PTServices}
            />
          </div>
        </div>

        {/* Sidebar: Table of Contents - Ponemos el aside a la derecha en pantallas medianas o más grandes */}
        <aside className="order-1 md:sticky md:top-24 md:order-2 md:max-h-fit md:w-1/4 md:self-start">
          <TableOfContents
            items={service.tableOfContents ? service.tableOfContents : []}
          />
        </aside>
      </div>
    </article>
  );
}
