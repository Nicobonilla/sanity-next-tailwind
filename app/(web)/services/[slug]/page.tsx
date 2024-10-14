import { PortableText, PortableTextComponents } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types'
import { getServiceBySlugFetch } from '@/sanity/lib/fetch';
import { Metadata } from 'next';
import { TableOfContents } from '@/components/pages/services/TableOfContents';
import { Breadcrumbs } from '@/components/pages/services/Breadcrumbs'; // Asegúrate de que esté implementado correctamente
import { GetServiceDetailQueryResult } from '@/sanity.types';
import Image from 'next/image';

interface TableOfContents {
  id: string;
  title: string;
  level: number;
}

interface ServiceData {
  title: string;
  content: PortableTextBlock[]; // Considera crear un tipo más específico si es posible
  tableOfContents: TableOfContents[];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service: GetServiceDetailQueryResult = await getServiceBySlugFetch(params.slug);
  return {
    title: service?.title,
    openGraph: {
      title: service?.title  || '',
      type: 'article',
    },
    other: {
      'table-of-contents': JSON.stringify(service?.tableOfContents),
    },
  };
}

const components: PortableTextComponents = {
  block: {
    // Personalizar el renderizado del encabezado h2
    h2: ({ value, children }) => {
      const headingId = `heading-${value._key}`; // El ID único para el enlace
      return (
        <h2 id={headingId} className="group relative dark:text-white">
          {children}
        </h2>
      );
    },
    p:  ({ value, children }) => {
      return (
        <p className="dark:text-white">
          {children}
        </p>
      );
    },
  },
  types: {
    image: ({value}) => <img alt=" " src={value.imageUrl} />,
    callToAction: ({value, isInline}) =>
      isInline ? (
        <a href={value.url}>{value.text}</a>
      ) : (
        <div className="callToAction">{value.text}</div>
      ),
  },
};

export default async function Page({ params }: { params: { slug: string } }) {
  const service: GetServiceDetailQueryResult = await getServiceBySlugFetch(params.slug);

  if (!service) {
    return <div>Servicio no encontrado.</div>; // Manejo básico de errores
  }

  return (
    <article className="container max-w-7xl mx-auto px-8 py-8">
      {/* Breadcrumbs */}
      {/* <Breadcrumbs /> */}

      <h1 className="text-4xl font-bold mb-6">{service.title}</h1>

      <div className="flex flex-col md:flex-row gap-14">
        {/* Main Content: Asegura que el contenido principal esté a la izquierda */}
        <div className="md:w-3/4 order-2 md:order-1">
          <div className="prose prose-sm max-w-none">
            <PortableText value={service.content || []} components={components} />
          </div>
        </div>

        {/* Sidebar: Table of Contents - Ponemos el aside a la derecha en pantallas medianas o más grandes */}
        <aside className="md:w-1/4 px-5 order-1 md:order-2">
          <TableOfContents items={service.tableOfContents ? service.tableOfContents : [] } />
        </aside>
      </div>
    </article>
  );
}
